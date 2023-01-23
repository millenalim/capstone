// import Talk from 'talkjs';
// import { useEffect, useState, useRef } from 'react';

// function MyChatComponent() {
//   const chatboxEl = useRef();

//   // wait for TalkJS to load
//   const [talkLoaded, markTalkLoaded] = useState(false);

//   useEffect(() => {
//     Talk.ready.then(() => markTalkLoaded(true));

//     if (talkLoaded) {
//       const currentUser = new Talk.User({
//         id: '1',
//         name: 'Millena Lim',
//         email: 'millena@lim.com',
//         welcomeMessage: 'Hello!',
//         role: 'default',
//       });

//       const otherUser = new Talk.User({
//         id: '2',
//         name: 'Jessica Wells',
//         email: 'jessicawells@example.com',
//         photoUrl: 'jessica.jpeg',
//         welcomeMessage: 'Hello!',
//         role: 'default',
//       });

//       const session = new Talk.Session({
//         appId: 'tbFXs0DD',
//         me: currentUser,
//       });

//       const conversationId = Talk.oneOnOneId(currentUser, otherUser);
//       const conversation = session.getOrCreateConversation(conversationId);
//       conversation.setParticipant(currentUser);
//       conversation.setParticipant(otherUser);

//       const chatbox = session.createChatbox();
//       chatbox.select(conversation);
//       chatbox.mount(chatboxEl.current);

//       return () => session.destroy();
//     }
//   }, [talkLoaded]);

//   return <div style={{height: '500px'}} className="inbox-container" ref={chatboxEl} />;
// }

// export default MyChatComponent;

import React, { Component, Fragment } from "react";
import Talk from "talkjs";

class MyChatComponent extends Component {
  constructor(props) {
    super(props);

    this.inbox = undefined;
  }

  componentDidMount() {
    Talk.ready
      .then(() => {
        const currentUser = new Talk.User({
          id: "1",
          name: "Millena Lim",
          email: "millena@lim.com",
          welcomeMessage: "Hello!",
          role: "default",
        });

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tbFXs0DD",
            me: currentUser,
          });
        }

        const other = new Talk.User({
          id: "2",
          name: "Jessica Wells",
          email: "jessicawells@example.com",
          photoUrl: "jessica.jpeg",
          welcomeMessage: "Hello!",
          role: "default",
        });

        // You control the ID of a conversation. oneOnOneId is a helper method that generates
        // a unique conversation ID for a given pair of users.
        const conversationId = Talk.oneOnOneId(currentUser, other);

        const conversation =
          window.talkSession.getOrCreateConversation(conversationId);
        conversation.setParticipant(currentUser);
        conversation.setParticipant(other);

        this.inbox = window.talkSession.createInbox({
          selected: conversation,
        });
        this.inbox.mount(this.container);
      })
      .catch((e) => console.error(e));
  }

  componentWillUnmount() {
    if (this.inbox) {
      this.inbox.destroy();
    }
  }

  render() {
    return (
      <Fragment>
        <div
          style={{ height: "500px" }}
          className="inbox-container"
          ref={(c) => (this.container = c)}
        >
          Loading...
        </div>
      </Fragment>
    );
  }
}

export default MyChatComponent;
