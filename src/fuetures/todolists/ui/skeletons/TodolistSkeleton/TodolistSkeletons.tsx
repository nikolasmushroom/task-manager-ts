import s from './TodolistSceleton.module.css'
type TodolistsSkeletonProps = {
  skeletonsCount : number
}
export const TodolistSkeletons = ({ skeletonsCount = 3 } : TodolistsSkeletonProps) => {
  return (
    <>
      {Array(skeletonsCount)
      .fill(null)
      .map((_, id) => (
        <div className={s.todolist} key={id}>
          <div className={`${s.todolistItem} ${s.skeletonContent}`} style={{width : '40px'}}></div>
          <div className={`${s.todolistItem} ${s.skeletonContent}`} style={{width : '185px'}}></div>
        </div>
      ))}
    </>


  )
}