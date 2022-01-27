import Draggable from "react-draggable"
import google from "../../assets/images/google.jpg"

export const HeroCard = () => {
    return (
        <>
            <div className="draggable_content">
                <Draggable>
                    <div className="draggble_card_content google_img">
                    </div>
                </Draggable>

                <Draggable>
                    <div className="draggble_card_content fb_img">FB</div>
                </Draggable>

                <Draggable>
                    <div className="draggble_card_content amazon_img">Amazon</div>
                </Draggable>

            </div>
        </>
    )
}
