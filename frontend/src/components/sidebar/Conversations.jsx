
import useGetConversations from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
import { useEffect } from "react";
const Conversations = () => {
    const { loading, conversations } = useGetConversations();
    
    // Check if conversations.filterdUsers exists before mapping over it
    const filteredUsers = conversations?.filterdUsers || [];
    
    useEffect(() => {
        // Print user data to console only when conversations are available
        if (filteredUsers.length > 0) {
            console.log(filteredUsers);
        }
    }, [filteredUsers]);
    
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {filteredUsers.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === filteredUsers.length - 1}
                />
            ))}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
};

export default Conversations;