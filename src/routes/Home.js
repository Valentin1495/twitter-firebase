import { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/TweetFactory";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([])

    useEffect(() => {
        dbService.collection("tweets").onSnapshot((snapshot) => {
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setTweets(tweetArray)
        })
    }, [])

    return (
        <div className="container">
            <TweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {tweets.map((tweet) =>
                    <Tweet 
                        tweetObj={tweet}
                        key={tweet.id}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                )}
            </div>
        </div>
    )
}

export default Home;