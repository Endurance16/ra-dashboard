function Home() {
  return (
    <section
      style={{
        height: '100vh',
        backgroundImage: 'url("/hero-bg.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1rem' }}>
        RA Dashboard
      </h1>
      <p style={{
        fontSize: '1.2rem',
        maxWidth: '600px',
        marginBottom: '2rem',
        color: '#f0f0f0'
      }}>
        Manage research time, tasks, and collaboration like a pro.
      </p>
      <a href="/timelogs">
        <button style={{
          padding: '1rem 2rem',
          fontSize: '1rem',
          backgroundColor: '#38bdf8',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease'
        }}>
          Get Started
        </button>
      </a>
    </section>
  );
}

export default Home;
