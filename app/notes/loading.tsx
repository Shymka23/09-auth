import css from "./loading.module.css";

export default function Loading() {
  return (
    <div className={css.loadingContainer}>
      <div className={css.spinner}></div>
      <p className={css.loadingText}>Loading notes, please wait...</p>
    </div>
  );
}
