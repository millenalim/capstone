import { useEffect, useState, useRef } from 'react';
import Talk from 'talkjs';
import ParticlesBg from 'particles-bg';

function MyChatComponent() {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: '1',
        name: 'Millena Lim',
        email: 'millena@lim.com',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const otherUser = new Talk.User({
        id: '4',
        name: 'John Williams',
        email: 'john@williams.com',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 'tDb6Ljie',
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return (
    <>
    <div className="row banner">
      <ParticlesBg
        type="cobweb"
        bg={true}
      />
      <div style={{height: '500px'}} className="inbox-container" ref={chatboxEl} />
    </div>
    </>
  );
}

export default MyChatComponent;
