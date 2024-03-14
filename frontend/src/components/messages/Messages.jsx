import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
MessageSkeleton
const Messages = () => {

  const{loading,messages}=useGetMessages();
  //as soon as we send a message automatically  THE SCREEN SHOULD SCROLL DOWN
  const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);
 
 return (
    <div className="px-4 flex-1 overflow-auto">

{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

    {/* to  show when data is loading */}
       {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
       {/* to show when there is no conversation b/w users */}
       {!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
    </div>
  )
	
};
export default Messages;
