import { z } from 'zod'
import {
    MsgPrioSchema,
    MsgTypeSchema,
    BoardTypeIdSchema,
    BoardInstIdSchema,
} from './messageTypes.js'

// ============================================================
// Parsed CAN Message
// ============================================================

/**
 * Schema for a fully parsed CAN message as produced by the
 * Parsley parser. The `data` field contains message-type-specific
 * payload fields and is null when the message carries no payload.
 */
export const ParsleyMessageSchema = z.object({
    msgPrio: MsgPrioSchema,
    msgType: MsgTypeSchema,
    boardTypeId: BoardTypeIdSchema,
    boardInstId: BoardInstIdSchema,
    data: z.record(z.string(), z.unknown()).nullable(),
})

export type ParsleyMessage = z.infer<typeof ParsleyMessageSchema>
