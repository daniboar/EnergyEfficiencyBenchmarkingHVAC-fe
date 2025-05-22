import { DataPoint } from '../types/DashboardTypes';

// Extrag tipul cladirii din nume (ex: Office, Assembly, Education)
export const getBuildingType = (name: string) => {
    if (!name) return '';
    const parts = name.split('_');
    return parts.length > 1 ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : '';
};

// Extrag numele unic al cladirii din identificator (ex: Tina, Teofila)
export const getBuildingName = (name: string) => {
    if (!name) return '';
    const parts = name.split('_');
    return parts.length > 2 ? parts[2] : '';
};

// Returnez numele zilei pentru o data anume
export const getDayName = (date: Date | undefined) => {
    if (!date) return '';
    const zile = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
    return zile[date.getDay()];
};

// Formatez axa X
export const xTickFormatter = (tick: string, selectedDate: Date | undefined) => {
    if (!selectedDate) return tick.split(' ')[0]; // doar data
    // doar ora
    const parts = tick.split(' ');
    return parts[1] || tick;
};

// Explicatiile pentru fiecare tip de cladire
export const buildingTypeExplanations: { [key: string]: string } = {
    Assembly: "Clădiri destinate adunărilor publice precum săli de conferințe, teatre, și săli de sport. Acestea au un consum energetic ridicat în perioadele de utilizare intensă.",
    Education: "Instituții educaționale precum școli și universități. Acestea au un model de consum sezonier, cu vârfuri în timpul anului școlar și consum redus în vacanțe.",
    Lodging: "Clădiri de cazare precum hoteluri și pensiuni. Acestea au un consum continuu dar variabil în funcție de ocupare.",
    Office: "Clădiri de birouri cu program regulat. Acestea au un consum predictibil în timpul săptămânii de lucru și redus în weekend.",
    Parking: "Structuri de parcare, adesea cu ventilație mecanică.",
    Retail: "Spații comerciale precum magazine și mall-uri. Acestea au un consum ridicat datorită iluminatului, climatizării și traficului intens de clienți."
};

// Sfaturi pentru eficiența energetica pentru fiecare tip de cladire
export const buildingTypeEfficiencyTips: { [key: string]: string[] } = {
    Assembly: [
        "Implementarea sistemelor HVAC cu viteze variabile care se adaptează la ocuparea sălii",
        "Utilizarea unuor senzori de prezență pentru a ajusta ventilația în funcție de numărul de persoane",
        "Planificare preîncălzirea/prerăcirea înainte de evenimente pentru a evita consumurile de vârf",
        "Instalarea sistemelor de recuperare a căldurii pentru a reutiliza energia din aerul evacuat"
    ],
    Education: [
        "Sincronizarea funcționării sistemelor HVAC cu programul școlar și vacanțele",
        "Implementarea controlului zonal pentru a climatiza doar spațiile ocupate",
        "Utilizarea răcirii naturale când este posibil (în special noaptea)",
        "Instruirea personalului și elevilor despre comportamente de economisire a energiei"
    ],
    Lodging: [
        "Instalarea termostatelor inteligente în camere care se ajustează când acestea sunt neocupate",
        "Implementarea sistemelor de management al clădirii pentru controlul centralizat al HVAC",
        "Utilizarea senzorilor la ferestre pentru a opri climatizarea când ferestrele sunt deschise",
        "Optimizarea programului de funcționare al piscinelor, saunelor și altor facilități cu consum ridicat"
    ],
    Office: [
        "Programarea sistemelor HVAC să funcționeze doar în orele de lucru cu ajustări pentru preîncălzire/prerăcire",
        "Instalarea sistemelor de monitorizare în timp real pentru a identifica rapid ineficiențele"
    ],
    Parking: [
        "Implementarea ventilației la cerere bazată pe senzori de CO și CO2",
        "Utilizarea iluminatului LED inteligent care se ajustează în funcție de prezență",
        "Instalarea sistemelor de ghidare a mașinilor pentru a reduce timpul de căutare a locurilor și ventilația necesară",
    ],
    Retail: [
        "Implementarea ușilor automate sau a perdelelor de aer pentru a reduce pierderile termice",
        "Utilizarea sistemelor de management al energiei pentru optimizarea consumului",
        "Implementarea strategiilor de întreținere preventivă pentru a menține sistemele la eficiență maximă"
    ]
};

// Filtrare date dupa data selectata (sau toate daca nu e selectata data)
export const filterDataByDate = (data: DataPoint[], selectedDate: Date | undefined) => {
    if (!selectedDate) return data;
    
    return data.filter((d) => {
        const dataDate = new Date(d.timestamp);
        return (
            dataDate.getFullYear() === selectedDate.getFullYear() &&
            dataDate.getMonth() === selectedDate.getMonth() &&
            dataDate.getDate() === selectedDate.getDate()
        );
    });
}; 