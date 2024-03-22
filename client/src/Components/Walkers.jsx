// BOOK A WALK

export default function Walkers() {
  const [owner, setOwner] = useState({});
  // const [pet, setPet] = useState({});
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  // confirm token exists / user logged in
  // useEffect makes a call while still allowing this component to render
  useEffect(() => {
    const getAccount = async () => {
      try {
        // useEffect will not continue until fetchAccount(token) returns a promise
        const fetchedAccount = await fetchAccount(token);
        // update state to store the fetched account
        setOwner(fetchedAccount);
      } catch (error) {
        setError(error.message);
      }
    };
    getAccount();
  }, []);
  
  if (error) return <div>Error: {error}</div>;
  
  // User is not logged in, render a message
  if (!owner.id) {
    return <p>Please log in or create an account.</p>;
  }

  // get all owner info
  // in html, filter for owners with specific availability
    return (
        <div className="home">
            <h1>Walkers</h1>
        <form>
          <label>Day:
            <input type="date" placeholder=" MM/DD/YYYY" />
          </label>
          <label>Time:
            <input type="time" placeholder=" 12:00PM" step={36000}/>
          </label>
          <label>Pet:
            <input type="text" placeholder=" Sergeant Barksalot" />
          </label>
          <label>
            <input type="submit" />
          </label>
        </form>
        </div>
    );
}