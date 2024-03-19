export default function Walkers() {

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