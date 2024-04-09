import React, { useState, useEffect } from 'react';
import MyCardGrid from '../components/card-grid';
import DateSelector from '../components/date-selector';
import LanguageSelector from '../components/language-selection';
import LoadingAnimation from '../components/loader';
import './home.css';

interface FeedItem {
    title: string;
    description: string;
    image: string;
    link_url: string;
  }
  
  interface CardData {
    title: string;
    description: string;
    image: string;
    link_url: string;
  }

const HomeScreen: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLanguage, setSelectedLanguage] = useState('Ingles');
    const [feedData, setFeedData] = useState<FeedItem[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [endOfData, setEndOfData] = useState(false);
    const itemsPerPage = 5; 
  
    useEffect(() => {
      fetchData();
    }, [selectedLanguage, selectedDate, currentPage]); // Actualizar datos cuando cambia el idioma, la fecha o la página actual
  
    useEffect(() => {
      function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
  
          
    
          if (!loading && !endOfData) {
            // Evitar cargar datos múltiples veces mientras se está cargando
            setCurrentPage(prevPage => prevPage + 1); // Incrementar la página actual para cargar los siguientes elementos
          }
        }
      }
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, endOfData]); // Agregar loading a las dependencias para evitar agregar el mismo listener múltiples veces
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const languageAbbreviation: { [key: string]: string } = {
          'Espanol': 'es',
          'Ingles': 'en',
          'Frances': 'fr',
        };
        const translationUrl = `http://localhost:3000/feed/translate/en?lang=${languageAbbreviation[selectedLanguage]}&date=${selectedDate.toISOString().split('T')[0]}&page=${currentPage}&limit=${itemsPerPage}`;
        const response = await fetch(translationUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: FeedItem[] = await response.json();
  
  
    if (data.length === 0) {
          setEndOfData(true); 
        } else {
          setFeedData(prevData => [...prevData, ...data]); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleLanguageChange = (language: string) => {
      setSelectedLanguage(language);
      setFeedData([]); 
      setCurrentPage(1);
      setEndOfData(false); 
    };
  
    const handleDateChange = (date: Date) => {
      setSelectedDate(date);
      setFeedData([]); 
      setCurrentPage(1);
      setEndOfData(false); 
    };
  
    const languages = ["Ingles", "Espanol", "Frances"];
  
    const cardData: CardData[] = feedData
      .slice(0, currentPage * itemsPerPage) 
      .map((item: FeedItem) => {
        return {
          title: item.title, 
          description: item.description,
          image: item.image,
          link_url: item.link_url
        };
      });
  
    return (    
      <div className='app-container'>
        <div className='App-header'>
          <LanguageSelector languages={languages} onLanguageChange={handleLanguageChange} />
          <br />
          <DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />
        </div>
        <br />
        <div className='App-body'>
          <MyCardGrid cardsData={cardData} /> {/* Pasar los datos convertidos a CardData */}
          {loading && <LoadingAnimation />}
          {endOfData && <p>No more data available.</p>}
        </div>      
      </div>
    );
};

export default HomeScreen;
