
import VisitorEntry from '../components/VisitorEntry'
const Visitors = () => {
  

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-8 col-lg-6 mt-3">
                    <VisitorEntry />
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-6 ">
                    <img src="/Hero.jpg" alt="" className='w-100 rounded mt-1' />
                </div>
            </div>
        </div>
    )
}

export default Visitors
