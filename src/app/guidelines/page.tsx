// app/guidelines/page.tsx
"use client"
import React, { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
const GuidelinesPage = ()=> {

const router = useRouter()

const feedbackBtn = ()=>{
  router.push('/feedback')
}

  return (
    <section className="space-y-12 px-6 md:px-16 py-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-teal-700">
          Passenger Safety & Comfort Guidelines
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Ensuring every ride is safe, reliable, and respectful for all passengers.
        </p>
      </div>

      {/* button */}

      <div className='flex  justify-center'>
        <button onClick={feedbackBtn} className='text-white bg-black text-2xl p-3 rounded-2xl cursor-pointer'>Feedback</button>
      </div>

      {/* 1. Getting Started with Your Ride */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2">
          <img
            src="https://orangecitycabs.com/wp-content/uploads/2024/04/airport_img_1.png"
            alt="Start Ride"
            className="rounded-lg shadow-md"
            width={600}
            height={400}
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold text-teal-600">
            1. Getting Started with Your Ride
          </h3>
          <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2 text-justify">
            <li>
              <strong>Verify the Vehicle and Driver:</strong> Check the license plate, driver photo, and car model before getting in.
            </li>
            <li>
              <strong>Confirm Your Name:</strong> Always wait for the driver to confirm your name before you board to avoid mix-ups or scams.
            </li>
            <li>
              <strong>Board in a Safe Location:</strong> Enter the car from the curbside and avoid high-traffic areas if possible.
            </li>
            <li>
              <strong>Use Seatbelts:</strong> Always wear your seatbelt, even for short trips.
            </li>
            <li>
              <strong>Rate Your Trip:</strong> Give a rating and leave comments—it helps ensure accountability and improves future rides.
            </li>
          </ul>
        </div>
      </div>

      {/* 2. Identifying Untrained or Unsafe Drivers */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-6">
        <div className="md:w-1/2">
          <img
            src="https://gpscompany.ae/wp-content/uploads/2024/12/Driver-Behavior-Monitor-1024x1024.webp"
            alt="Untrained Driver"
            className="rounded-lg shadow-md"

          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold text-teal-600">
            2. Identifying Untrained or Unsafe Drivers
          </h3>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-3 text-justify">
            <li>
                <strong>Rude or Aggressive Behavior:</strong> Driver who yelling unnecessarily at passengers should be avoided , making sarcastic or demeaning comments, using threatening gestures, or engaging in road rage toward other drivers or pedestrians. Drivers should be respectful and calm, especially in stressful traffic situations.
            </li>
            <li>
                <strong>Visible Intoxication or Substance Use:</strong> Signs such as bloodshot or glassy eyes, slurred speech, the smell of alcohol or drugs, difficulty maintaining focus, sudden mood swings, or delayed reactions are major red flags. If you suspect intoxication, end the ride immediately and report it via the app.
            </li>
            <li>
                <strong>Improper Attire and Lack of Hygiene:</strong> Drivers should appear clean and professionally dressed. Warning signs include wearing sleepwear, overly revealing or inappropriate clothing, being barefoot, or having strong body odor or unclean vehicle interiors. A driver’s appearance reflects their commitment to professionalism and rider comfort.
            </li>
            <li>
                <strong>Unsafe or Reckless Driving Practices:</strong> Watch for excessive speeding, abrupt braking or acceleration, failure to use signals, frequent lane weaving, ignoring traffic signs or lights, and texting or talking on the phone while driving. These habits create a dangerous environment for all road users.
            </li>
            <li>
                <strong>Failure to Verify Identity or Follow App Protocols:</strong> Legitimate drivers will always confirm your name before starting the ride. Refusing to do so, taking you on an unfamiliar or unapproved route, asking for cash despite app-based payments, or pressuring you to cancel and rebook outside the app are serious concerns and should be reported.
            </li>
            <li>
                <strong>Overcrowding or Unauthorized Passengers:</strong> Drivers should never allow more passengers than the vehicle’s capacity or pick up other riders during your trip without prior notice (unless it’s a carpooling ride through the app). Overcrowding is a safety violation and can make passengers uncomfortable.
            </li>
            <li>
                <strong>Disregard for Rider Preferences:</strong> Ignoring requests for quiet rides, inappropriate music or videos, refusal to adjust climate settings, or engaging in unwelcome personal conversations can create discomfort. Drivers are expected to maintain a professional boundary and respect the rider’s preferences.
            </li>
            <li>
                <strong>Neglecting Safety Features:</strong> Not encouraging the use of seat belts, blocking access to emergency exits, or failing to lock doors properly during travel are all signs of negligence. Drivers must ensure that all safety features in the vehicle are functional and accessible.
            </li>
            </ul>

        </div>
      </div>

      {/* 3. Recognizing Unmaintained Vehicles */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2">
          <Image
            src="/man.jpg"
            alt="Unmaintained Vehicle"
            className="rounded-lg shadow-md"
            width={600}
            height={400}
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold text-teal-600">
            3. Recognizing Unmaintained Vehicles
          </h3>
          <ul className="list-disc list-inside mt-4 text-gray-700 space-y-3">
            <li>
              <strong>Exterior Issues:</strong> Watch for cracked or shattered windshields, broken or taped-over headlights and taillights, rust patches, body dents —these often reflect poor upkeep and possible structural weaknesses.
            </li>
            <li>
              <strong>Mechanical Red Flags:</strong> Be cautious if the vehicle emits unusual engine noises (such as grinding, rattling, or high-pitched whining), visible exhaust smoke, or strong smells of gasoline, oil, or burning rubber. These may point to serious underlying issues.
            </li>
            <li>
              <strong>Interior Neglect:</strong> Warning signs include stained or torn upholstery, persistent foul odors (such as mold, smoke, or chemicals), broken seat adjustments, cluttered footwells, and loose interior panels—all of which may indicate general neglect.
            </li>
            <li>
              <strong>Safety Warnings:</strong> Look for missing seatbelts, damaged airbags, or improperly secured child seats. If dashboard lights like the check engine, ABS, airbag, or tire pressure warning are illuminated, these may suggest unresolved safety or mechanical problems.
            </li>
            <li>
              <strong>Ride Comfort Problems:</strong> If the car bounces excessively, pulls to one side, or feels unstable around corners, it may suffer from suspension, alignment, or tire issues. Struggling doors or windows that jam or won’t seal properly are also concerning.
            </li>
          </ul>

        </div>
      </div>

      {/* 4. Making Safe Choices */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-6">
        <div className="md:w-1/2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO8jA7T_1TiUwBKUVuRuQRoKV-tCjVc75p_gGjx_NebC_Iaf14lF5L0lm8jA6V6DjKpZI&usqp=CAU"
            alt="Safe Choices"
            className="rounded-lg shadow-md"
            width={600}
            height={400}
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-3xl font-semibold text-teal-600">
            4. Making Safe Choices
          </h3>
          <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2 text-justify">
            <li>
              <strong>End the Ride if Necessary:</strong> 
              If at any point you feel uncomfortable or unsafe, calmly ask the driver to stop at a nearby <b>well-lit and public location</b> such as a store, petrol pump, or bus stop. Trust your instincts—your safety always comes first.
            </li>
            <li>
              <strong>Use In-App Safety Tools:</strong> 
              Most ride apps include emergency buttons, live location sharing, and contact features. Use them to alert friends or family, or call emergency services quickly if needed. Familiarize yourself with these tools before you start the ride.
            </li>
            <li>
              <strong>Avoid Isolated Drop-Offs:</strong> 
              Especially during <b>night-time rides</b>, plan your drop-off at a <b>populated, well-lit area</b>. If your home is in a quiet lane, consider getting off at a nearby main road and walking a short distance with someone or under street lights.
            </li>
            <li>
              <strong>Don’t Share Personal Information:</strong> 
              While being polite is good, <b>avoid sharing sensitive details</b> like your phone number, full name, or address. If asked, simply say, “I prefer to keep personal info private for safety.”
            </li>
          </ul>

        </div>
      </div>

      {/* 5. Reporting and Feedback */}
      <div className="flex flex-col md:flex-row items-center gap-6 mt-20">
        <div className="md:w-1/2">
          <img
            src="https://thumbs.dreamstime.com/b/woman-ordering-taxi-mobile-app-night-young-woman-ordering-taxi-mobile-app-city-street-night-351838061.jpg"
            alt="Reporting"
            className="rounded-lg shadow-md"
            width={600}
            height={400}
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-3xl font-semibold text-teal-600">
            5. Reporting & Feedback
          </h3>
<ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
  <li>
    <strong>Report Unsafe Behavior:</strong>  
    If a driver behaves aggressively, drives recklessly, or acts inappropriately, please report it directly through the app. Your feedback helps us take action against such behavior and protect future riders.
  </li>
  <li>
    <strong>Detailed Feedback Helps:</strong>  
    When reporting an issue, be as specific as possible—mention what happened, where, and when. The more details you provide, the better we can investigate and respond appropriately.
  </li>

  <li>
    <strong>Follow Up if Needed:</strong>  
    For serious incidents, don’t hesitate to follow up on your report. We’re committed to taking every concern seriously and will ensure your case is addressed properly.
  </li>
</ul>

        </div>
      </div>


    </section>
  );
}

export default GuidelinesPage