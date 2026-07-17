export default function StatCard({

    title,
    value,
    color

}) {

    return (

        <div className="col-md-4 mb-4">

            <div className={`card border-${color} shadow`}>

                <div className="card-body text-center">

                    <h5>{title}</h5>

                    <h1>{value}</h1>

                </div>

            </div>

        </div>

    );

}