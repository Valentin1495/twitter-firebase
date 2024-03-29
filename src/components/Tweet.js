import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { dbService, storageService } from "../fbase"

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false)
    const [newTweet, setNewTweet] = useState(tweetObj.text)
    
    const toggleEditing = () => setEditing(prev => !prev)
    
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?")
        if (ok) {
            dbService.doc(`tweets/${tweetObj.id}`).delete()
            storageService.refFromURL(tweetObj.attachmentUrl).delete()
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet
        })
        setEditing(false)
    }

    const onChange = (event) => {
        const {
            target: {value}
        } = event
        setNewTweet(value)
    }

    return (
        <div className="tweet">
            {editing ? 
                <>
                    <form onSubmit={onSubmit} className="tweetEdit" >
                        <input
                            type="text"
                            placeholder="Edit your tweet"
                            value={newTweet}
                            required
                            onChange={onChange}
                            autoFocus
                            className="formInput"
                        />
                        <input 
                            type="submit" 
                            value="Update tweet"
                            className="formBtn"
                        />
                    </form>
                    <span 
                        onClick={toggleEditing}
                        className="formBtn cancelBtn"
                    >
                        Cancel
                    </span>
                </>
                :
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && 
                        <img src={tweetObj.attachmentUrl} />
                    }
                    {isOwner && 
                        <div className="tweet__actions">
                          <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                          <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </span>
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default Tweet;