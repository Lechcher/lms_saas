// Import necessary React hooks for state management and side effects
import { useState, useCallback, useEffect } from "react";
// Import the Vapi-AI web SDK
import Vapi from "@vapi-ai/web";

// Define the interface for Vapi configuration properties
interface VapiConfig {
  publicKey: string; // The public key for Vapi-AI API
  assistantId: string; // The ID of the assistant to be used
  baseUrl?: string; // Optional base URL for the Vapi-AI API
}

// Define the interface for the state managed by the useVapi hook
interface VapiState {
  isSessionActive: boolean; // Indicates if a Vapi session is currently active
  isLoading: boolean; // Indicates if the Vapi session is in a loading state (e.g., connecting)
  error: string | null; // Stores any error message that occurs, or null if no error
}

// Custom React hook for interacting with the Vapi-AI SDK
export const useVapi = (config: VapiConfig) => {
  // State to hold the Vapi instance
  const [vapi, setVapi] = useState<Vapi | null>(null);
  // State to manage the Vapi session status (active, loading, error)
  const [state, setState] = useState<VapiState>({
    isSessionActive: false,
    isLoading: false,
    error: null,
  });

  // useEffect hook to initialize Vapi instance and set up event listeners
  useEffect(() => {
    // Create a new Vapi instance with the provided public key and optional base URL
    const vapiInstance = new Vapi(config.publicKey, config.baseUrl);
    setVapi(vapiInstance);

    // Event handler for when a call starts
    const handleCallStart = () => {
      setState((prev) => ({
        ...prev,
        isSessionActive: true,
        isLoading: false,
      }));
    };

    // Event handler for when a call ends
    const handleCallEnd = () => {
      setState((prev) => ({
        ...prev,
        isSessionActive: false,
        isLoading: false,
      }));
    };

    // Event handler for errors during the Vapi session
    const handleError = (error: any) => {
      setState((prev) => ({ ...prev, error: error.message, isLoading: false }));
    };

    // Register event listeners for Vapi events
    vapiInstance.on("call-start", handleCallStart);
    vapiInstance.on("call-end", handleCallEnd);
    vapiInstance.on("error", handleError);

    // Cleanup function to remove event listeners when the component unmounts or dependencies change
    return () => {
      vapiInstance.off("call-start", handleCallStart);
      vapiInstance.off("call-end", handleCallEnd);
      vapiInstance.off("error", handleError);
    };
  }, [config.publicKey, config.baseUrl]); // Dependencies: re-run effect if public key or base URL changes

  // useCallback hook to memoize the startCall function
  const startCall = useCallback(async () => {
    // If Vapi instance is not initialized, do nothing
    if (!vapi) return;

    // Set loading state and clear any previous errors
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Start the Vapi call with the specified assistant ID
      await vapi.start(config.assistantId);
    } catch (error: any) {
      // If an error occurs, update the state with the error message
      setState((prev) => ({ ...prev, error: error.message, isLoading: false }));
    }
  }, [vapi, config.assistantId]); // Dependencies: re-create function if vapi instance or assistant ID changes

  // useCallback hook to memoize the endCall function
  const endCall = useCallback(() => {
    // If Vapi instance is not initialized, do nothing
    if (!vapi) return;
    // Stop the active Vapi call
    vapi.stop();
  }, [vapi]); // Dependencies: re-create function if vapi instance changes

  // Return the functions and state for consumption by components
  return {
    startCall, // Function to start a Vapi call
    endCall, // Function to end a Vapi call
    ...state, // Spread the current Vapi session state (isSessionActive, isLoading, error)
  };
};
