import { Collection, InsertOneResult } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getDateOnly } from '../utils/utility';
import { database } from '../db/connection';
import { UserDocument } from '../db/models/user.model';

class UserService {
  private collectionName: string;

  constructor(collectionName: string) {
  	this.collectionName = collectionName;
  }

  public async addUser(userDetails: UserDocument): Promise<UserDocument> {
  	try {

  		// Hash the password
  		const hashedPassword = await bcrypt.hash(userDetails.password, 10);

  		// Replace plain text password with hashed password
  		userDetails.password = hashedPassword;

  		const collection: Collection<UserDocument> = database.collection(this.collectionName);
  		const result: InsertOneResult<UserDocument> = await collection.insertOne(userDetails);

  		if (result.insertedId) {
  			userDetails._id = result.insertedId; // Assign the inserted ID to the user document
  			return userDetails;
  		}
  		throw new Error('Failed to retrieve inserted user ID');
  	} catch (error) {
  		throw new Error(`Error adding user: ${error.message}`);
  	}
  }

public async getUsers(startDate?: Date, endDate?: Date, page = 1, limit = 10): Promise<{ users: UserDocument[], count: number }> {
	try {
	  const skip = (page - 1) * limit; // Calculate skip value based on page number and limit
  
	  // Construct the date range query
	  const matchStage = this.dateRangeQuery(startDate, endDate);
	  const collection: Collection<UserDocument> = database.collection(this.collectionName);
  
	  // Aggregation pipeline
	  const pipeline = [
		{ $match: matchStage }, // Match documents based on the date range
		{ $skip: skip }, // Skip documents based on pagination
		{ $limit: limit }, // Limit the number of documents returned based on pagination
	  ];
  
	  // Execute aggregation pipeline to fetch user records
	  const users: UserDocument[] = await collection.aggregate<UserDocument>(pipeline).toArray();
  
	  // Count total number of user records
	  const countPipeline = [{ $match: matchStage }, { $count: 'count' }];
	  const [{ count }] = await collection.aggregate<{ count: number }>(countPipeline).toArray();
  
	  return { users, count };
	} catch (error) {
	  throw new Error(`Error fetching users: ${error.message}`);
	}
  }

  private dateRangeQuery(startDate?: Date, endDate?: Date): any {
  	let query = {};
  	// If start date and/or end date are provided, construct the date range query
  	if (startDate && endDate) {
  		query = { dateOfBirth: { $gte: getDateOnly(startDate), $lte: getDateOnly(endDate) } };
  	} else if (startDate) {
  		query = { dateOfBirth: { $gte: startDate } };
  	} else if (endDate) {
  		query = { dateOfBirth: { $lte: endDate } };
  	}

  	return query;
  }
}

export default UserService;
