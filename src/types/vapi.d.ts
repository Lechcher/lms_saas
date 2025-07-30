// This file defines TypeScript types and interfaces for Vapi AI messages and their structures.

/**
 * Enum for different types of messages in the Vapi AI system.
 */
enum MessageTypeEnum {
  TRANSCRIPT = "transcript",
  FUNCTION_CALL = "function-call",
  FUNCTION_CALL_RESULT = "function-call-result",
  ADD_MESSAGE = "add-message",
}

/**
 * Enum for the roles of messages in a conversation.
 */
enum MessageRoleEnum {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
}

/**
 * Enum for the type of transcript messages (partial or final).
 */
enum TranscriptMessageTypeEnum {
  PARTIAL = "partial",
  FINAL = "final",
}

/**
 * Base interface for all Vapi messages.
 */
interface BaseMessage {
  type: MessageTypeEnum;
}

/**
 * Interface for a transcript message, containing speech-to-text data.
 */
interface TranscriptMessage extends BaseMessage {
  type: MessageTypeEnum.TRANSCRIPT;
  role: MessageRoleEnum;
  transcriptType: TranscriptMessageTypeEnum;
  transcript: string;
}

/**
 * Interface for a function call message, indicating a function to be executed.
 */
interface FunctionCallMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL;
  functionCall: {
    name: string;
    parameters: unknown;
  };
}

/**
 * Interface for a function call result message, containing the outcome of a function execution.
 */
interface FunctionCallResultMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL_RESULT;
  functionCallResult: {
    forwardToClientEnabled?: boolean;
    result: unknown;
    [a: string]: unknown;
  };
}

/**
 * Union type for all possible Vapi message types.
 */
type Message =
  | TranscriptMessage
  | FunctionCallMessage
  | FunctionCallResultMessage;
