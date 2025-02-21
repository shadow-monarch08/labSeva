import React from 'react'
import no from "../../images/no.jpg";
import user from '../../images/user-circle-svgrepo-com.svg'
import calender from '../../images/calendar-date-schedule-svgrepo-com.svg'

const NewsComponent = (props) => {

    const formatDate = (date_current) => {
        const date = new Date(date_current);

        // Get day, month, and year components
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month starts from 0, so add 1
        const year = date.getFullYear() % 100; // Get last two digits of the year

        // Format day and month to have leading zeros if needed
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        // Create the formatted date string
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
        return formattedDate

    }
    const { title, description, imgUrl, readMore, author, date, name } = props
    return (
        <div className="newscomponent">
            <div className="detail-section">
                <div className="category__detail-section">
                    <h6 className="category__heading">Category</h6>
                    <div className="category">Health</div>
                </div>
                <div className="news__detail-section">
                    <p className="news__title">{title}</p>
                    <p className="news__description">{description}...</p>
                    <a href={readMore} className="news__more" target='_blank' rel="noopener noreferrer">Read more...</a>
                </div>
                <div className="news__authorDetail-date">
                    <div className="author-detail">
                        <img src={user} alt="" />
                        <p>{!author ? "Unknown" : author}</p>
                    </div>
                    <div className="date">
                        <img src={calender} alt="" />
                        {formatDate(new Date(date).toUTCString())}
                    </div>
                </div>
            </div>
            <div className="wrapper-one">
                <div className="wrapper-two">
                    <div className="wrapper-three" style={{ background: `url(${!imgUrl ? no : imgUrl}) no-repeat center/cover` }} >
                        <img src={!imgUrl ? no : imgUrl} alt="" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewsComponent