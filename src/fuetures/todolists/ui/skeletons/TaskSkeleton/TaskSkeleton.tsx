import s from "./TaskSkeleton.module.css";

export const TaskSkeleton = () => {
  return <>
    <div className={`${s.task} ${s.skeletonContent}`}>
    </div>
  </>
}