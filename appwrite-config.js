import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';


export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECTID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASEID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERCOLLECTIONID,
  videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOCOLLECTIONID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGEID
};



const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId) 
    .setPlatform(appwriteConfig.platform) 
;


const account = new Account(client);

const databases = new Databases(client);

const avatar = new Avatars(client);

const storage = new Storage(client);


export const createNewUser = async (fullName, email, password) => {

    try {

        const createNewAccountOfUserInAppwriteAuth = await account.create(
            ID.unique(),
            email,
            password,
            fullName
        );

        if(!createNewAccountOfUserInAppwriteAuth) {

            throw Error;

        }

        const avatarUrlofTheUser = avatar.getInitials(fullName);

        await signInUser(email, password);

        const newUserInAppwriteDB = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                fullName: fullName,
                email: email,
                avatar: avatarUrlofTheUser,
                accountId: createNewAccountOfUserInAppwriteAuth?.$id
            }
        );

        return newUserInAppwriteDB;
        
    } catch (error) {
        
        console.log(error);

        throw new Error(error);
        
    }

}


export const signInUser = async (email, password) => {

    try {

        const session = await account.createEmailPasswordSession(email, password);

        return session;
        
    } catch (error) {
        
        console.log(error);

        throw new Error(error);

    }

}


export const getCurrentLoggedInUserDetails = async () => {

    try {

        const currentLoggedInUser = await account.get();

        if(!currentLoggedInUser) {

            throw Error;

        }

        const currentUserDetails = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentLoggedInUser.$id)]
        );


        if(!currentUserDetails) {

            throw Error;

        }


        return currentUserDetails.documents[0];

        
    } catch (error) {
        
        console.log(error);

        throw new Error(error);

    }

}


export const getAllAvailableVideoPostsOfAllUsers = async () => {

    try {
       
        const allVideoPosts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt')]
        );

        return allVideoPosts.documents;


    } catch (error) {
        
        console.log(error);

        throw new Error(error);
        
    }

}


export const getLatestVideoPosts = async () => {

    try {
       
        const allLatestVideoPosts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [
                Query.orderDesc('$createdAt'), 
                Query.limit(4) 
            ]
        );
        

        return allLatestVideoPosts.documents;


    } catch (error) {
        
        console.log(error);

        throw new Error(error);
        
    }

}


export const getSearchedVideoPosts = async (query) => {

    try {
       
        const allSearchedVideoPosts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [
                Query.search('title', query)
            ]
        );
        

        return allSearchedVideoPosts.documents;


    } catch (error) {
        
        console.log(error);

        throw new Error(error);
        
    }

}


export const getAllVideoPostsByCurrentlyLoggedInUser = async (userId) => {

    try {
       
        const allVideoPostsByCurrentlyLoggedInUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [
                Query.equal('creator', userId)
            ]
        );
        

        return allVideoPostsByCurrentlyLoggedInUser.documents;


    } catch (error) {
        
        console.log(error);

        throw new Error(error);
        
    }

}


export const logoutUserFromTheApplication = async () => {

    try {

        const session = await account.deleteSession('current');

        return session;
        
    } catch (error) {
        
        console.log(error);

        throw new Error(error);

    }

}


export const getFilePreview = (uploadedFileId, fileType) => {

    let urlOfTheUploadedFile;

    try {

        if(fileType === 'video') {

            urlOfTheUploadedFile = storage.getFilePreview(
                appwriteConfig.storageId,
                uploadedFileId
            );

        } else if (fileType === 'image') {

            urlOfTheUploadedFile = storage.getFilePreview(
                appwriteConfig.storageId,
                uploadedFileId,
                2000, 2000, 'top', 100
            );

        } else {

            throw new Error('Invalid file type');

        }


        if(!urlOfTheUploadedFile) {

            throw Error;

        }


        return urlOfTheUploadedFile;
        
    
    } catch (error) {
        
        console.log(error);

        throw new Error(error);

    }

}


export const uploadFile = async (file, fileType) => {

    try {

        if(!file) {

            return;

        }

        const asset = {
            name: file.fileName,
            type: file.mimeType,
            size: file.fileSize,
            uri: file.uri
        }


        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, fileType);

        return fileUrl;
        
    } catch (error) {
        
        console.log(error);

        throw new Error(error);

    }

}


export const createVideoPost = async (formData) => {

    try {
        
        const [ urlOfUploadedThumbnail, urlOfUploadedVideo ] = await Promise.all([

            uploadFile(formData.thumbnail, 'image'),

            uploadFile(formData.video, 'video')

        ]);


        const newPostCreatedInAppwriteDB = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: formData.title,
                thumbnail: urlOfUploadedThumbnail,
                video: urlOfUploadedVideo,
                creator: formData.userId
            }
        );


        return newPostCreatedInAppwriteDB;

        
    } catch (error) {
        
        console.log(error);

        throw new Error(error);

    }

}