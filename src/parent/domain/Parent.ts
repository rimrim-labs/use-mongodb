import mongoose, { Types, Schema, Model } from 'mongoose'

export interface ChildType {
  _id: Types.ObjectId
  info: string
}

export interface ParentType {
  name: string
  age: number
  child: ChildType[]
}

/**
 * Parent 필드 타입 오버라이드
 * - Mongoose는 중첩 타입을 서브 다큐먼트가 아닌 프로퍼티로 취급
 * - '타입 오버라이드'로 서브 다큐먼트에 대해 다큐먼트 타입 선언
 */
type ParentDocumentProps = {
  child: Types.DocumentArray<ChildType>
}
type ParentModelType = Model<ParentType, {}, ParentDocumentProps>

const childSchema = new Schema<ChildType, Model<ChildType>>({
  info: { type: String, default: 'default', required: true },
})

const parentSchema = new Schema<ParentType>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  child: [childSchema],
})

export const ParentModel = mongoose.model<ParentType, ParentModelType>('Parent', parentSchema)
