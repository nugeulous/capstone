export default function Trainers() {
    return (
        <div className="home">
            <h1>Trainers</h1>
            <form>
          <label>Day:
            <input type="date" placeholder=" MM/DD/YYYY" />
          </label>
          <label>Time:
            <input type="time" placeholder=" 12:00PM" />
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