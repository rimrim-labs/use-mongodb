import mongoose, { ClientSession } from 'mongoose'

type Callback<Response> = (session: ClientSession) => Promise<Response>

export async function transactionWrapper<Response>(
  callback: Callback<Response>
): Promise<Response | undefined> {
  let session

  try {
    session = await mongoose.startSession()
    session.startTransaction()

    const result = await callback(session)

    await session.commitTransaction()

    return result
  } catch (err) {
    if (session) await session.abortTransaction()
    throw err
  } finally {
    if (session) await session.endSession()
  }
}
