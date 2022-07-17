import React, {useRef, useState} from 'react'
import { Form, Button,Container, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import { useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function Login() {
  const emailLoginRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailLoginRef.current.value, passwordRef.current.value)
history.push("/")
    }
    catch(error) {
      console.log(error)
      setError('Failed to sign in')
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
<h2 className="text-center mb-4">Bejelentkezés</h2>
{error && <Alert variant="danger">{error}</Alert>}
<Form onSubmit={handleSubmit}>
<Form.Group id="emailLogin">
<Form.Label>Email</Form.Label>
<Form.Control type="email" ref={emailLoginRef} required />
</Form.Group>

<Form.Group id="password">
<Form.Label>Jelszó</Form.Label>
<Form.Control type="password" ref={passwordRef} required />
</Form.Group>


<Button disabled={loading} type="submit" className="mt-2"> Bejelentkezés</Button>
</Form>
<div className="text-center mt-3"><Link to="/forgot-password">Elfelejtett jelszó</Link></div>
</Card.Body>
</Card>
<div className="text-center mt-2">
Nincs felhasználói hozzáférésed? Kérlek írj a kapcsolattartódnak vagy info@marketyour.store email címre
</div>
</div>
</Container>
</div>
  )
}
