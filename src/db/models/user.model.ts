import mongoose, { Document, Schema } from 'mongoose';

// Define user schema
export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  dateOfBirth: Date;
}

const userSchema = new Schema<UserDocument>({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		// Validate email format
		validate: {
			validator: (v: string) => /\S+@\S+\.\S+/.test(v),
			message: (props: { value: string }) => `${props.value} is not a valid email address!`,
		},
	},
	password: {
		type: String,
		required: true,
		// Validate password requirements
		validate: {
			validator: (v: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(v),
			message: (props: { value: string }) => 'Password must contain at least one lowercase letter, one uppercase letter, one number, one symbol, and be at least 8 characters long!',
		},
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
});

// Create User model
const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
