import schedule
import smtplib
import requests
from bs4 import BeautifulSoup

def umbrellaReminder():
    city = "Kolkata"
    url = "https://www.google.com/search?q=weather+" + city
    try:
        html = requests.get(url).content
        soup = BeautifulSoup(html, 'html.parser')
        
        
        temperature = soup.find('div', attrs={'class': 'BNeawe iBp4i AP7Wnd'}).text
        time_sky = soup.find('div', attrs={'class': 'BNeawe tAd8D AP7Wnd'}).text
        sky = time_sky.split('\n')[1]
        print(f"Weather condition: {sky}")
        
        
        rainy_conditions = ["Rainy", "Haze", "Cloudy", "Thunderstorm", "Heavy rains", "Showers"]
        if any(cond in sky for cond in rainy_conditions):
            
            smtp_object = smtplib.SMTP('smtp.gmail.com', 587)
            smtp_object.starttls()
            smtp_object.login("gameofcodes0@gmail.com", "yvmc oiwx rsyc wezi")
            
            
            subject = "Umbrella Reminder from GameofCodes"
            body = f"Take an umbrella before leaving the house. Weather condition for today is {sky} and temperature is {temperature} in {city}."
            msg = f"Subject: {subject}\n\n{body}\n\nRegards,\nGame Of Codes".encode('utf-8')
            
            
            smtp_object.sendmail("gameofcodes0@gmail.com", "User_input_email", msg)
            smtp_object.quit()
            print("Email Sent!")
        else:
            print("No umbrella needed today.")
    except Exception as e:
        print("An error occurred:", e)


schedule.every().day.at("00:40").do(umbrellaReminder)


while True:
    schedule.run_pending()

#if These code is't working:
    #(https://www.youtube.com/watch?v=g_j6ILT-X0k&list=WL&index=1&t=121s)
    #try this YOUTUBE video.Thank You

