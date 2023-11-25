import os
from dotenv import load_dotenv
import matplotlib.pyplot as plt
import pymongo

# Load environment variables from .env file
load_dotenv()

# Access MongoDB URI from environment variables
mongo_uri = os.getenv("MONGO_URI")

# Connect to MongoDB Atlas cluster
client = pymongo.MongoClient(mongo_uri)
db = client["Movie-Booking"]
movies_collection = db["movies"]

# Query the top 10 movies with the highest average rating
top_rated_movies = movies_collection.find(
    {}, {"name": 1, "averageRating": 1, "numOfReviews": 1}
).sort("averageRating", pymongo.DESCENDING).limit(3)

# Query the top 10 movies with the highest number of reviews
most_reviewed_movies = movies_collection.find(
    {}, {"name": 1, "averageRating": 1, "numOfReviews": 1}
).sort("numOfReviews", pymongo.DESCENDING).limit(3)

# Extract data for plotting (top 10 rated movies)
top_rated_movie_names = []
top_rated_avg_ratings = []
top_rated_num_of_reviews = []

for movie in top_rated_movies:
    top_rated_movie_names.append(movie["name"])
    top_rated_avg_ratings.append(movie["averageRating"])
    top_rated_num_of_reviews.append(movie["numOfReviews"])

# Stylish Plotting Movie Names vs Average Rating (Top 10 rated movies)
plt.figure(figsize=(12, 6))
plt.bar(
    top_rated_movie_names,
    top_rated_avg_ratings,
    color="#3498db",
    edgecolor="#2980b9",
    alpha=0.7,
    linewidth=1.5,
)
plt.xlabel("Movie Names", fontsize=14)
plt.ylabel("Average Rating", fontsize=14)
plt.title("Top 10 Rated Movies", fontsize=16)
plt.xticks(rotation=45, ha="right", fontsize=12)
plt.yticks(fontsize=12)
plt.grid(axis="y", linestyle="--", alpha=0.7)
plt.tight_layout()
plt.savefig("./public/uploads/top_rated_movies.jpg")
plt.close()

# Extract data for plotting (top 10 most reviewed movies)
most_reviewed_movie_names = []
most_reviewed_avg_ratings = []
most_reviewed_num_of_reviews = []

for movie in most_reviewed_movies:
    most_reviewed_movie_names.append(movie["name"])
    most_reviewed_avg_ratings.append(movie["averageRating"])
    most_reviewed_num_of_reviews.append(movie["numOfReviews"])

# Stylish Plotting Movie Names vs Number of Reviews (Top 10 most reviewed movies)
plt.figure(figsize=(12, 6))
plt.bar(
    most_reviewed_movie_names,
    most_reviewed_num_of_reviews,
    color="#2ecc71",
    edgecolor="#27ae60",
    alpha=0.7,
    linewidth=1.5,
)
plt.xlabel("Movie Names", fontsize=14)
plt.ylabel("Number of Reviews", fontsize=14)
plt.title("Top 10 Most Reviewed Movies", fontsize=16)
plt.xticks(rotation=45, ha="right", fontsize=12)
plt.yticks(fontsize=12)
plt.grid(axis="y", linestyle="--", alpha=0.7)
plt.tight_layout()
plt.savefig("./public/uploads/top_reviewed_movies.jpg")
plt.close()
