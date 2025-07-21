import { Client, Databases, Query, ID } from 'appwrite';

const Project_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;  
const Endpoint= import.meta.env.VITE_APPWRITE_ENDPOINT;
const Database_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const Collection_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


const client = new Client()
        .setEndpoint(Endpoint) // Your Appwrite endpoint
        .setProject(Project_ID); // Your Appwrite project ID

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) =>{
    // console.log(Project_ID, Database_ID, Collection_ID);
   
    //1.Use Appwrite SDK to check if the search term already exists in the database
    try{
        const result=await database.listDocuments(Database_ID,Collection_ID, [Query.equal('searchTerm', searchTerm.toLowerCase())]);
      
    //2.If it exists, increment the count
        if(result.documents.length>0){

            const doc = result.documents[0];
            await database.updateDocument(Database_ID, Collection_ID, doc.$id, {
                count:doc.count + 1,
             });
        }
          //3.If it doesn't exist, create a new document with count set to 1
        else{

            await database.createDocument(Database_ID, Collection_ID, ID.unique(), {
                searchTerm: searchTerm.toLowerCase(),
                count: 1,
                movie_id: movie.id,
                poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/post_not_found.png'
                });
        }
    }
    catch(error) {
        console.error('Error checking search term:', error);
        return;
    }
    
};

export const getTrendingMovies = async() =>{
    try{
        const result = await database.listDocuments(Database_ID,Collection_ID,[Query.limit(5),Query.orderDesc("count")]);
        return result.documents;
    }
    catch(error){
        console.log(error);
    }
};