import ConversationList from '@/components/screens/Conversations/ConversationList';
import MetaTitle from 'meta/MetaTitle';
import { FC } from 'react';

const Conversations: FC = () => {
  return (
    <>
      <MetaTitle title='Мессенджер' />
      <ConversationList />
    </>
  )
}

export default Conversations;