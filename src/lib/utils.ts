// This file contains utility functions for various purposes, including Tailwind CSS class merging,
// subject color retrieval, and Vapi AI assistant configuration.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

/**
 * Merges Tailwind CSS classes conditionally.
 * @param inputs - Class values to merge.
 * @returns A merged string of Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retrieves the color associated with a given subject.
 * @param subject - The subject name.
 * @returns The hex color code for the subject.
 */
export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

/**
 * Configures and returns a Vapi AI assistant object.
 * The assistant's voice, transcriber, and model are set based on provided parameters and predefined constants.
 * @param voice - The desired voice type (e.g., "male", "female").
 * @param style - The desired voice style (e.g., "casual", "formal").
 * @returns A CreateAssistantDTO object configured for the Vapi AI assistant.
 */
export const configureAssistant = (voice: string, style: string) => {
  const voiceId =
    voices[voice as keyof typeof voices][
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "google",
      model: "gemini-2.5-flash-lite",
      language: "English",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.8,
      style: 0.5,
      useSpeakerBoost: true,
      model: "eleven_flash_v2_5",
    },
    model: {
      provider: "cerebras",
      model: "llama3.1-8b",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

                    Tutor Guidelines:
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
              `,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };
  return vapiAssistant;
};
