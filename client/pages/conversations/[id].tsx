import Conversation from '@/components/screens/Conversation/Conversation';
import MetaTitle from 'meta/MetaTitle';
import { FC } from 'react';

const Dialog: FC = () => {
  return (
    <>
      <MetaTitle title={`Мессенджер`} />
      <Conversation />
    </>
  )
}

export default Dialog;