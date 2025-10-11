import React from "react";

const SafeZone = () => {

    const handleMarkSafePlace = () => {
        // TODO: Implement logic to mark safe place on map or backend
        alert("Safe place marked! Thank you for your input.");
    }

    return (
        <section className="p-6  rounded-md w-full mx-auto flex flex-col gap-4 items-center">
            <h2 className="text-3xl text-green-600 font-bold mb-4 text-start w-[80%]">Your Safe Zone</h2>
            <div className="map mr-8 w-[80%] h-[20rem] bg-white flex items-center justify-center p-3 rounded-xl shadow-2xl shadow-[#909090]">


                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244446.9550678029!2d91.53807239352766!3d26.14326307086533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a287f9133ff%3A0x2bbd1332436bde32!2sGuwahati%2C%20Assam!5e1!3m2!1sen!2sin!4v1760031694756!5m2!1sen!2sin"
                    style={{ border: 0 }}
                    className='rounded-lg  w-full h-full'
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            <button
                onClick={handleMarkSafePlace}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                Mark Safe Place
            </button>
        </section>
    )
}

export default SafeZone;