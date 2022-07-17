import React, {useRef, useState} from 'react'
import { Form, Button,Container, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import {Link} from 'react-router-dom'

export default function ForgotPassword() {
  const emailLoginRef = useRef()
  const { resetPassword } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailLoginRef.current.value)
      setMessage("Elküldtük a megadott email címre az új jelszó beállításához szükséges linket.")
    }
    catch(error) {
      setError('Failed to reset password')
    }

setLoading(false)
  }

  return (
    <div>
    <Container className="d-flex align-item-center justify-content-center"
    style={{ minHeight: "100vh"}}>
    <div className="w-100" style={{maxWidth: "600px"}}>
<Card>
<Card.Body>
<h2 className="text-center mb-4">Új jelszó beállítása</h2>
{error && <Alert variant="danger">{error}</Alert>}
{message && <Alert variant="success">{message}</Alert>}
<Form onSubmit={handleSubmit}>
<Form.Group id="emailLogin">
<Form.Label>Email</Form.Label>
<Form.Control type="email" ref={emailLoginRef} required />
</Form.Group>


<Button disabled={loading} type="submit" className="mt-2"> Új jelszó</Button>
</Form>
<div className="text-center mt-3"><Link to="/login">Bejelentkezés</Link></div>
</Card.Body>
</Card>
</div>
</Container>
</div>
  )
}
