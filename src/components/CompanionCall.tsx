"use client";

// Import utility functions and Vapi SDK
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
// Import React hooks and components
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
// Import soundwave animation data and action for session history
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companion.actions";

// Enum to define possible call statuses
enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

// CompanionCall component props interface (assuming CompanionCallProps is defined elsewhere)
interface CompanionCallProps {
  companionId: string;
  subject: string;
  topic: string;
  name: string;
  userName: string;
  userImage: string;
  style: string;
  voice: string;
}

// CompanionCall component for managing and displaying a call session with a companion
const CompanionCall = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionCallProps) => {
  // State variables for call status, speaking indicator, mute status, and messages
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  // Ref for Lottie animation control
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Effect to control Lottie animation based on speaking status
  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  // Effect to set up Vapi event listeners
  useEffect(() => {
    // Callback for when the call starts
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    // Callback for when the call ends, adds session to history
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    // Callback for incoming messages, specifically handling final transcripts
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript,
        };

        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    // Callbacks for speech start and end events
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    // Callback for errors
    const onError = (error: Error) => console.log("Error", error);

    // Register Vapi event listeners
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    // Cleanup function to unregister Vapi event listeners on component unmount
    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [companionId]); // Dependency array includes companionId to re-run effect if it changes

  // Function to toggle microphone mute status
  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  // Function to handle starting a call
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    // Define assistant overrides for Vapi configuration
    const assistantOverrides = {
      variableValues: {
        subject,
        topic,
        style,
      },
      clientMessages: ["transcript"], // Receive transcripts from the client
      serverMessages: [], // No specific server messages configured
    };

    // Start the Vapi call with configured assistant and overrides
    // @ts-expect-error - Ignored type error for dynamic component import (Vapi SDK might have dynamic types)
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  // Function to handle disconnecting a call
  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop(); // Stop the Vapi call
  };

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        {/* Companion section */}
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }} // Set background color based on subject
          >
            {/* Companion image based on call status */}
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse" // Pulse animation when connecting
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>

            {/* Lottie animation for active call */}
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>

        {/* User section */}
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-full border-4 border-black"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>

          {/* Microphone toggle button */}
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE} // Disable if call is not active
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn On Microphone" : "Turn Off Microphone"}
            </p>
          </button>
          {/* Session control button (Start/End/Connecting) */}
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            } // Toggle between disconnect and call
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting"
              : "Start Session"}
          </button>
        </div>
      </section>

      {/* Transcript section */}
      <section className="transcript">
        <div className="uppercase transcript-message no-scrollbar">
          {messages.map((message, index) => {
            if (message.role === "assistant") {
              return (
                <p key={index} className="max-sm:text-sm">
                  {name.split(" ")[0].replace("/[.,]/g, ", "")} :
                  {` ${message.content}`}
                </p>
              );
            } else {
              return (
                <p key={index} className="text-primary max-sm:text-sm">
                  {userName}: {message.content} {/* Display user's name */}
                </p>
              );
            }
          })}
        </div>
        <div className="transcript-fade" />{" "}
        {/* Visual fade effect for transcript */}
      </section>
    </section>
  );
};

export default CompanionCall;
