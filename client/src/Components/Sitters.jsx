export default function Sitters() {
    return (
        <div className="home">
            <h1>Sitters</h1>
            <form>
          <label>Start:
            <input type="date" placeholder=" MM/DD/YYYY" />
          </label>
          <label>End:
            <input type="date" placeholder=" MM/DD/YYYY" />
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