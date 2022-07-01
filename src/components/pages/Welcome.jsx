import React from 'react';
import s from "./Welcome.module.css"

const Welcome = () => {
  return (
    <div className={s.welcome}>
        Welcome!
        <p className={s.welcome__not__found}>You could also be redirected to this page if you made a mistake in the url address.</p>
    </div>
  )
}

export default Welcome;