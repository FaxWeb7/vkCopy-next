import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { MdOutlineMoreHoriz } from 'react-icons/md'
import { Context } from '../../../../../pages/_app';
import styles from './deletecomment.module.scss'

const DeleteComment: FC<{postId: string, commentId: string}> = ({ postId, commentId }) => {
  const [isCommentMore, setIsCommentMore] = useState<boolean>(false)
  const {store} = useContext(Context)
  const router = useRouter()

  const deleteComment = async (): Promise<void> => {
    await store.deleteComment(router.query.id, postId, commentId)
    router.asPath[1] === 'p' ? window.location.reload() : window.location.reload()
  }

  return (
    <>
      <button className={styles['post-more']} onClick={() => setIsCommentMore(!isCommentMore)}><MdOutlineMoreHoriz /></button>
      {isCommentMore && (
        <div className={isCommentMore ? `${styles['post-change']} ${styles['active']}` : styles['post-change']} onClick={() => deleteComment()}>
          <h2 className={styles['change-item']}>Удалить комментарий</h2>
        </div>
      )}
    </>
  )
}

export default DeleteComment;