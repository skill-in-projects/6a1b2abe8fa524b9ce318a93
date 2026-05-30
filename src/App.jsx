import { useState, useEffect } from 'react'

function coderField(coder, key) {
  if (!coder) return ''
  const pascal = key.charAt(0).toUpperCase() + key.slice(1)
  return coder[pascal] ?? coder[key] ?? ''
}

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const [coders, setCoders] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch(`${window.CONFIG?.API_URL}/api/testcoder`)
      .then((res) => res.json())
      .then((data) => setCoders(data))
  }, [])

  function handleSelect(event) {
    const id = event.target.value
    if (!id) {
      setSelected(null)
      return
    }
    const coder = coders.find((c) => String(coderField(c, 'id')) === id) ?? null
    setSelected(coder)
  }

  if (!showForm) {
    return (
      <button
        type="button"
        className="btn-test-api"
        onClick={() => setShowForm(true)}
      >
        Test Coders Form
      </button>
    )
  }

  return (
    <div className="coder-form-panel">
      <button
        type="button"
        className="btn-test-api"
        onClick={() => {
          setShowForm(false)
          setSelected(null)
        }}
      >
        Back to Landing
      </button>

      <form className="coder-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="coder-select">Coders</label>
        <select
          id="coder-select"
          value={selected ? String(coderField(selected, 'id')) : ''}
          onChange={handleSelect}
        >
          <option value="">Select a coder…</option>
          {coders.map((coder) => {
            const id = coderField(coder, 'id')
            const name = coderField(coder, 'name')
            return (
              <option key={id} value={id}>
                {name}
              </option>
            )
          })}
        </select>
      </form>

      {selected && (
        <div className="coder-details">
          <h3>Coder Information</h3>
          <p>
            <strong>ID:</strong> {coderField(selected, 'id')}
          </p>
          <p>
            <strong>Name:</strong> {coderField(selected, 'name')}
          </p>
          <p>
            <strong>Email:</strong> {coderField(selected, 'email')}
          </p>
          <p>
            <strong>Role:</strong> {coderField(selected, 'role')}
          </p>
        </div>
      )}
    </div>
  )
}
