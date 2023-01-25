import NotificationContext from '@/store/notification-context';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import Button from '../ui/button';
import classes from './new-registration.module.css';

function NewRegistration(props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  const emailValidRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const router = useRouter();

  const sendRegistrationHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const eventId = router?.query.evId;

    try {
        const response = await fetch('/api/event-registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: enteredEmail,
                name: enteredName,
                eventId: eventId
            })
        });
        const data = await response.json();
        console.log(data);
        if (response.ok || response.status === 200) {
          notificationCtx.showNotification({
            title: 'Success!',
            message: data.message,
            status: 'success',
          });
          emailInputRef.current.value = '';
          nameInputRef.current.value = '';
        }
        if (response.status === 409) {
          notificationCtx.showNotification({
            title: 'Error!',
            message: data.message,
            status: 'error',
          });
        }
        // if (!response.ok) throw new Error(`Error: ${response.status}`);
    } catch (err) {
        console.log('Error', err);
        notificationCtx.showNotification({
          title: 'Error!',
          message: err.message || 'Ops, something went wrong!',
          status: 'error',
        });
    }

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.match(emailValidRegex) ||
      !enteredName ||
      enteredName.trim() === ''
    ) {
      setIsInvalid(true);
      return;
    }

    // props.onNewRegistration({
    //   email: enteredEmail,
    //   name: enteredName,
    // });
  }

  return (
    <form className={classes.form} onSubmit={sendRegistrationHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameInputRef}/>
        </div>
      </div>
      {isInvalid && <p>Please make sure all fields are filled in correctly!</p>}
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default NewRegistration;
