import { z } from 'zod'
import type { AnyParsleyPayload } from './payloads.js'
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
 *
 * For typed payload validation per message type, use
 * `getPayloadSchema()` from `payloads.ts`.
 */
export const ParsleyMessageSchema = z.object({
    msgPrio: MsgPrioSchema,
    msgType: MsgTypeSchema,
    boardTypeId: BoardTypeIdSchema,
    boardInstId: BoardInstIdSchema,
    data: z.record(z.string(), z.union([z.string(), z.number()])).nullable(),
})

export type ParsleyMessage = Omit<
    z.infer<typeof ParsleyMessageSchema>,
    'data'
> & {
    data: AnyParsleyPayload | null
}
