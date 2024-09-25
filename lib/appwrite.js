import { Client, Account, ID, Models, Databases, Avatars } from 'react-native-appwrite'

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.mar.aora',
  projectId: '66f3a2ce00274ea2d723',
  databaseId: '66f3a4520038cf6c17d2',
  userCollectionId: '66f3a47e001aa9c747a0',
  videoCollectionId: '66f3a49600310a07af24',
  storageId: '66f3a6330021ce60c8eb',
}
const client = new Client()
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform)

const account = new Account(client)
const databases = new Databases(client)
const avatars = new Avatars(client)

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    )

    return newUser
  } catch (error) {
    throw new Error(error)
  }
}

export async function signIn(email, password) {
  try {
    return await account.createEmailPasswordSession(email, password)
  } catch (error) {
    throw new Error(error)
  }
}
