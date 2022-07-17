import React, {useRef, useState} from 'react'
import { Form, Button,Container, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const emailLoginRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const companyRef = useRef()
  const { signUp } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [newUser, setNewUser] = useState('')
  const [creating, setCreating] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signUp(emailLoginRef.current.value, passwordRef.current.value, companyRef.current.value)
    }
    catch(error) {
      console.log(error)
      setError('Failed to create an account')
    }

setLoading(false)
setCreating(true)
  }


  return (
    <div>
    <Container className="d-flex align-item-center justify-content-center mt-3"
    style={{ minHeight: "100vh"}}>
    <div className="w-100" style={{maxWidth: "400px"}}>
<Card>
<Card.Body>
<h2 className="text-center mb-4">Bejelentkezési adatok felvitele</h2>
{error && <Alert variant="danger">{error}</Alert>}
<Form onSubmit={handleSubmit}>
<Form.Group id="emailLogin">
<Form.Label>Email</Form.Label>
<Form.Control type="email" ref={emailLoginRef} required />
</Form.Group>
<Form.Group id="company">
<Form.Label>Cégnév</Form.Label>
<Form.Control type="text" ref={companyRef} required />
</Form.Group>

<Form.Group id="password">
<Form.Label>Jelszó</Form.Label>
<Form.Control type="password" ref={passwordRef} required />
</Form.Group>

<Form.Group id="password-confirm">
<Form.Label>Jelszó Megerősítése</Form.Label>
<Form.Control type="password" ref={passwordConfirmRef} required />
</Form.Group>
<Button className="mt-3 btn btn-primary" disabled={loading} type="submit"> Létrehozás</Button>
</Form>

<div>
{creating && (<Link to={`/customers/new/${newUser}`} disabled={creating} data-id={newUser} className={"btn btn-primary mb-3 mt-3"}>Új ügyfél felvitele</Link>
)}</div>

</Card.Body>
</Card>

</div>
</Container>
</div>
  )
}
