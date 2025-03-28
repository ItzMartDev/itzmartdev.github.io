// Lista de países com seus fusos horários
const countries = [
    { name: 'Afghanistan', timezone: 'Asia/Kabul', flag: '🇦🇫' },
    { name: 'Albania', timezone: 'Europe/Tirane', flag: '🇦🇱' },
    { name: 'Algeria', timezone: 'Africa/Algiers', flag: '🇩🇿' },
    { name: 'Andorra', timezone: 'Europe/Andorra', flag: '🇦🇩' },
    { name: 'Angola', timezone: 'Africa/Luanda', flag: '🇦🇴' },
    { name: 'Antigua and Barbuda', timezone: 'America/Antigua', flag: '🇦🇬' },
    { name: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
    { name: 'Armenia', timezone: 'Asia/Yerevan', flag: '🇦🇲' },
    { name: 'Australia', timezone: 'Australia/Sydney', flag: '🇦🇺' },
    { name: 'Austria', timezone: 'Europe/Vienna', flag: '🇦🇹' },
    { name: 'Azerbaijan', timezone: 'Asia/Baku', flag: '🇦🇿' },
    { name: 'Bahamas', timezone: 'America/Nassau', flag: '🇧🇸' },
    { name: 'Bahrain', timezone: 'Asia/Bahrain', flag: '🇧🇭' },
    { name: 'Bangladesh', timezone: 'Asia/Dhaka', flag: '🇧🇩' },
    { name: 'Barbados', timezone: 'America/Barbados', flag: '🇧🇧' },
    { name: 'Belarus', timezone: 'Europe/Minsk', flag: '🇧🇾' },
    { name: 'Belgium', timezone: 'Europe/Brussels', flag: '🇧🇪' },
    { name: 'Belize', timezone: 'America/Belize', flag: '🇧🇿' },
    { name: 'Benin', timezone: 'Africa/Porto-Novo', flag: '🇧🇯' },
    { name: 'Bhutan', timezone: 'Asia/Thimphu', flag: '🇧🇹' },
    { name: 'Bolivia', timezone: 'America/La_Paz', flag: '🇧🇴' },
    { name: 'Bosnia and Herzegovina', timezone: 'Europe/Sarajevo', flag: '🇧🇦' },
    { name: 'Botswana', timezone: 'Africa/Gaborone', flag: '🇧🇼' },
    { name: 'Brazil', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
    { name: 'Brunei', timezone: 'Asia/Brunei', flag: '🇧🇳' },
    { name: 'Bulgaria', timezone: 'Europe/Sofia', flag: '🇧🇬' },
    { name: 'Burkina Faso', timezone: 'Africa/Ouagadougou', flag: '🇧🇫' },
    { name: 'Burundi', timezone: 'Africa/Bujumbura', flag: '🇧🇮' },
    { name: 'Cambodia', timezone: 'Asia/Phnom_Penh', flag: '🇰🇭' },
    { name: 'Cameroon', timezone: 'Africa/Douala', flag: '🇨🇲' },
    { name: 'Canada', timezone: 'America/Toronto', flag: '🇨🇦' },
    { name: 'Cape Verde', timezone: 'Atlantic/Cape_Verde', flag: '🇨🇻' },
    { name: 'Central African Republic', timezone: 'Africa/Bangui', flag: '🇨🇫' },
    { name: 'Chad', timezone: 'Africa/Ndjamena', flag: '🇹🇩' },
    { name: 'Chile', timezone: 'America/Santiago', flag: '🇨🇱' },
    { name: 'China', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
    { name: 'Colombia', timezone: 'America/Bogota', flag: '🇨🇴' },
    { name: 'Comoros', timezone: 'Indian/Comoro', flag: '🇰🇲' },
    { name: 'Congo', timezone: 'Africa/Brazzaville', flag: '🇨🇬' },
    { name: 'Costa Rica', timezone: 'America/Costa_Rica', flag: '🇨🇷' },
    { name: 'Croatia', timezone: 'Europe/Zagreb', flag: '🇭🇷' },
    { name: 'Cuba', timezone: 'America/Havana', flag: '🇨🇺' },
    { name: 'Cyprus', timezone: 'Asia/Nicosia', flag: '🇨🇾' },
    { name: 'Czech Republic', timezone: 'Europe/Prague', flag: '🇨🇿' },
    { name: 'Denmark', timezone: 'Europe/Copenhagen', flag: '🇩🇰' },
    { name: 'Djibouti', timezone: 'Africa/Djibouti', flag: '🇩🇯' },
    { name: 'Dominica', timezone: 'America/Dominica', flag: '🇩🇲' },
    { name: 'Dominican Republic', timezone: 'America/Santo_Domingo', flag: '🇩🇴' },
    { name: 'Ecuador', timezone: 'America/Guayaquil', flag: '🇪🇨' },
    { name: 'Egypt', timezone: 'Africa/Cairo', flag: '🇪🇬' },
    { name: 'El Salvador', timezone: 'America/El_Salvador', flag: '🇸🇻' },
    { name: 'Equatorial Guinea', timezone: 'Africa/Malabo', flag: '🇬🇶' },
    { name: 'Eritrea', timezone: 'Africa/Asmara', flag: '🇪🇷' },
    { name: 'Estonia', timezone: 'Europe/Tallinn', flag: '🇪🇪' },
    { name: 'Eswatini', timezone: 'Africa/Mbabane', flag: '🇸🇿' },
    { name: 'Ethiopia', timezone: 'Africa/Addis_Ababa', flag: '🇪🇹' },
    { name: 'Fiji', timezone: 'Pacific/Fiji', flag: '🇫🇯' },
    { name: 'Finland', timezone: 'Europe/Helsinki', flag: '🇫🇮' },
    { name: 'France', timezone: 'Europe/Paris', flag: '🇫🇷' },
    { name: 'Gabon', timezone: 'Africa/Libreville', flag: '🇬🇦' },
    { name: 'Gambia', timezone: 'Africa/Banjul', flag: '🇬🇲' },
    { name: 'Georgia', timezone: 'Asia/Tbilisi', flag: '🇬🇪' },
    { name: 'Germany', timezone: 'Europe/Berlin', flag: '🇩🇪' },
    { name: 'Ghana', timezone: 'Africa/Accra', flag: '🇬🇭' },
    { name: 'Greece', timezone: 'Europe/Athens', flag: '🇬🇷' },
    { name: 'Grenada', timezone: 'America/Grenada', flag: '🇬🇩' },
    { name: 'Guatemala', timezone: 'America/Guatemala', flag: '🇬🇹' },
    { name: 'Guinea', timezone: 'Africa/Conakry', flag: '🇬🇳' },
    { name: 'Guinea-Bissau', timezone: 'Africa/Bissau', flag: '🇬🇼' },
    { name: 'Guyana', timezone: 'America/Guyana', flag: '🇬🇾' },
    { name: 'Haiti', timezone: 'America/Port-au-Prince', flag: '🇭🇹' },
    { name: 'Honduras', timezone: 'America/Tegucigalpa', flag: '🇭🇳' },
    { name: 'Hungary', timezone: 'Europe/Budapest', flag: '🇭🇺' },
    { name: 'Iceland', timezone: 'Atlantic/Reykjavik', flag: '🇮🇸' },
    { name: 'India', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
    { name: 'Indonesia', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
    { name: 'Iran', timezone: 'Asia/Tehran', flag: '🇮🇷' },
    { name: 'Iraq', timezone: 'Asia/Baghdad', flag: '🇮🇶' },
    { name: 'Ireland', timezone: 'Europe/Dublin', flag: '🇮🇪' },
    { name: 'Israel', timezone: 'Asia/Jerusalem', flag: '🇮🇱' },
    { name: 'Italy', timezone: 'Europe/Rome', flag: '🇮🇹' },
    { name: 'Jamaica', timezone: 'America/Jamaica', flag: '🇯🇲' },
    { name: 'Japan', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'Jordan', timezone: 'Asia/Amman', flag: '🇯🇴' },
    { name: 'Kazakhstan', timezone: 'Asia/Almaty', flag: '🇰🇿' },
    { name: 'Kenya', timezone: 'Africa/Nairobi', flag: '🇰🇪' },
    { name: 'Kiribati', timezone: 'Pacific/Tarawa', flag: '🇰🇮' },
    { name: 'Kuwait', timezone: 'Asia/Kuwait', flag: '🇰🇼' },
    { name: 'Kyrgyzstan', timezone: 'Asia/Bishkek', flag: '🇰🇬' },
    { name: 'Laos', timezone: 'Asia/Vientiane', flag: '🇱🇦' },
    { name: 'Latvia', timezone: 'Europe/Riga', flag: '🇱🇻' },
    { name: 'Lebanon', timezone: 'Asia/Beirut', flag: '🇱🇧' },
    { name: 'Lesotho', timezone: 'Africa/Maseru', flag: '🇱🇸' },
    { name: 'Liberia', timezone: 'Africa/Monrovia', flag: '🇱🇷' },
    { name: 'Libya', timezone: 'Africa/Tripoli', flag: '🇱🇾' },
    { name: 'Liechtenstein', timezone: 'Europe/Vaduz', flag: '🇱🇮' },
    { name: 'Lithuania', timezone: 'Europe/Vilnius', flag: '🇱🇹' },
    { name: 'Luxembourg', timezone: 'Europe/Luxembourg', flag: '🇱🇺' },
    { name: 'Madagascar', timezone: 'Indian/Antananarivo', flag: '🇲🇬' },
    { name: 'Malawi', timezone: 'Africa/Blantyre', flag: '🇲🇼' },
    { name: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
    { name: 'Maldives', timezone: 'Indian/Maldives', flag: '🇲🇻' },
    { name: 'Mali', timezone: 'Africa/Bamako', flag: '🇲🇱' },
    { name: 'Malta', timezone: 'Europe/Malta', flag: '🇲🇹' },
    { name: 'Marshall Islands', timezone: 'Pacific/Majuro', flag: '🇲🇭' },
    { name: 'Mauritania', timezone: 'Africa/Nouakchott', flag: '🇲🇷' },
    { name: 'Mauritius', timezone: 'Indian/Mauritius', flag: '🇲🇺' },
    { name: 'Mexico', timezone: 'America/Mexico_City', flag: '🇲🇽' },
    { name: 'Micronesia', timezone: 'Pacific/Chuuk', flag: '🇫🇲' },
    { name: 'Moldova', timezone: 'Europe/Chisinau', flag: '🇲🇩' },
    { name: 'Monaco', timezone: 'Europe/Monaco', flag: '🇲🇨' },
    { name: 'Mongolia', timezone: 'Asia/Ulaanbaatar', flag: '🇲🇳' },
    { name: 'Montenegro', timezone: 'Europe/Podgorica', flag: '🇲🇪' },
    { name: 'Morocco', timezone: 'Africa/Casablanca', flag: '🇲🇦' },
    { name: 'Mozambique', timezone: 'Africa/Maputo', flag: '🇲🇿' },
    { name: 'Myanmar', timezone: 'Asia/Yangon', flag: '🇲🇲' },
    { name: 'Namibia', timezone: 'Africa/Windhoek', flag: '🇳🇦' },
    { name: 'Nauru', timezone: 'Pacific/Nauru', flag: '🇳🇷' },
    { name: 'Nepal', timezone: 'Asia/Kathmandu', flag: '🇳🇵' },
    { name: 'Netherlands', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
    { name: 'New Zealand', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
    { name: 'Nicaragua', timezone: 'America/Managua', flag: '🇳🇮' },
    { name: 'Niger', timezone: 'Africa/Niamey', flag: '🇳🇪' },
    { name: 'Nigeria', timezone: 'Africa/Lagos', flag: '🇳🇬' },
    { name: 'North Korea', timezone: 'Asia/Pyongyang', flag: '🇰🇵' },
    { name: 'North Macedonia', timezone: 'Europe/Skopje', flag: '🇲🇰' },
    { name: 'Norway', timezone: 'Europe/Oslo', flag: '🇳🇴' },
    { name: 'Oman', timezone: 'Asia/Muscat', flag: '🇴🇲' },
    { name: 'Pakistan', timezone: 'Asia/Karachi', flag: '🇵🇰' },
    { name: 'Palau', timezone: 'Pacific/Palau', flag: '🇵🇼' },
    { name: 'Palestine', timezone: 'Asia/Gaza', flag: '🇵🇸' },
    { name: 'Panama', timezone: 'America/Panama', flag: '🇵🇦' },
    { name: 'Papua New Guinea', timezone: 'Pacific/Port_Moresby', flag: '🇵🇬' },
    { name: 'Paraguay', timezone: 'America/Asuncion', flag: '🇵🇾' },
    { name: 'Peru', timezone: 'America/Lima', flag: '🇵🇪' },
    { name: 'Philippines', timezone: 'Asia/Manila', flag: '🇵🇭' },
    { name: 'Poland', timezone: 'Europe/Warsaw', flag: '🇵🇱' },
    { name: 'Portugal', timezone: 'Europe/Lisbon', flag: '🇵🇹' },
    { name: 'Qatar', timezone: 'Asia/Qatar', flag: '🇶🇦' },
    { name: 'Romania', timezone: 'Europe/Bucharest', flag: '🇷🇴' },
    { name: 'Russia', timezone: 'Europe/Moscow', flag: '🇷🇺' },
    { name: 'Rwanda', timezone: 'Africa/Kigali', flag: '🇷🇼' },
    { name: 'Saint Kitts and Nevis', timezone: 'America/St_Kitts', flag: '🇰🇳' },
    { name: 'Saint Lucia', timezone: 'America/St_Lucia', flag: '🇱🇨' },
    { name: 'Saint Vincent and the Grenadines', timezone: 'America/St_Vincent', flag: '🇻🇨' },
    { name: 'Samoa', timezone: 'Pacific/Apia', flag: '🇼🇸' },
    { name: 'San Marino', timezone: 'Europe/San_Marino', flag: '🇸🇲' },
    { name: 'Sao Tome and Principe', timezone: 'Africa/Sao_Tome', flag: '🇸🇹' },
    { name: 'Saudi Arabia', timezone: 'Asia/Riyadh', flag: '🇸🇦' },
    { name: 'Senegal', timezone: 'Africa/Dakar', flag: '🇸🇳' },
    { name: 'Serbia', timezone: 'Europe/Belgrade', flag: '🇷🇸' },
    { name: 'Seychelles', timezone: 'Indian/Mahe', flag: '🇸🇨' },
    { name: 'Sierra Leone', timezone: 'Africa/Freetown', flag: '🇸🇱' },
    { name: 'Singapore', timezone: 'Asia/Singapore', flag: '🇸🇬' },
    { name: 'Slovakia', timezone: 'Europe/Bratislava', flag: '🇸🇰' },
    { name: 'Slovenia', timezone: 'Europe/Ljubljana', flag: '🇸🇮' },
    { name: 'Solomon Islands', timezone: 'Pacific/Guadalcanal', flag: '🇸🇧' },
    { name: 'Somalia', timezone: 'Africa/Mogadishu', flag: '🇸🇴' },
    { name: 'South Africa', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
    { name: 'South Korea', timezone: 'Asia/Seoul', flag: '🇰🇷' },
    { name: 'South Sudan', timezone: 'Africa/Juba', flag: '🇸🇸' },
    { name: 'Spain', timezone: 'Europe/Madrid', flag: '🇪🇸' },
    { name: 'Sri Lanka', timezone: 'Asia/Colombo', flag: '🇱🇰' },
    { name: 'Sudan', timezone: 'Africa/Khartoum', flag: '🇸🇩' },
    { name: 'Suriname', timezone: 'America/Paramaribo', flag: '🇸🇷' },
    { name: 'Sweden', timezone: 'Europe/Stockholm', flag: '🇸🇪' },
    { name: 'Switzerland', timezone: 'Europe/Zurich', flag: '🇨🇭' },
    { name: 'Syria', timezone: 'Asia/Damascus', flag: '🇸🇾' },
    { name: 'Taiwan', timezone: 'Asia/Taipei', flag: '🇹🇼' },
    { name: 'Tajikistan', timezone: 'Asia/Dushanbe', flag: '🇹🇯' },
    { name: 'Tanzania', timezone: 'Africa/Dar_es_Salaam', flag: '🇹🇿' },
    { name: 'Thailand', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
    { name: 'Timor-Leste', timezone: 'Asia/Dili', flag: '🇹🇱' },
    { name: 'Togo', timezone: 'Africa/Lome', flag: '🇹🇬' },
    { name: 'Tonga', timezone: 'Pacific/Tongatapu', flag: '🇹🇴' },
    { name: 'Trinidad and Tobago', timezone: 'America/Port_of_Spain', flag: '🇹🇹' },
    { name: 'Tunisia', timezone: 'Africa/Tunis', flag: '🇹🇳' },
    { name: 'Turkey', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
    { name: 'Turkmenistan', timezone: 'Asia/Ashgabat', flag: '🇹🇲' },
    { name: 'Tuvalu', timezone: 'Pacific/Funafuti', flag: '🇹🇻' },
    { name: 'Uganda', timezone: 'Africa/Kampala', flag: '🇺🇬' },
    { name: 'Ukraine', timezone: 'Europe/Kiev', flag: '🇺🇦' },
    { name: 'United Arab Emirates', timezone: 'Asia/Dubai', flag: '🇦🇪' },
    { name: 'United Kingdom', timezone: 'Europe/London', flag: '🇬🇧' },
    { name: 'United States', timezone: 'America/New_York', flag: '🇺🇸' },
    { name: 'Uruguay', timezone: 'America/Montevideo', flag: '🇺🇾' },
    { name: 'Uzbekistan', timezone: 'Asia/Tashkent', flag: '🇺🇿' },
    { name: 'Vanuatu', timezone: 'Pacific/Efate', flag: '🇻🇺' },
    { name: 'Vatican City', timezone: 'Europe/Vatican', flag: '🇻🇦' },
    { name: 'Venezuela', timezone: 'America/Caracas', flag: '🇻🇪' },
    { name: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
    { name: 'Yemen', timezone: 'Asia/Aden', flag: '🇾🇪' },
    { name: 'Zambia', timezone: 'Africa/Lusaka', flag: '🇿🇲' },
    { name: 'Zimbabwe', timezone: 'Africa/Harare', flag: '🇿🇼' }
];

const clocksGrid = document.getElementById('clocksGrid');
const searchInput = document.getElementById('searchInput');

// Função para criar um card de relógio
function createClockCard(country) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.innerHTML = `
        <div class="country-info">
            <span class="country-flag">${country.flag}</span>
            <span class="country-name">${country.name}</span>
        </div>
        <div class="time-container">
            <div class="time" id="time-12h-${country.name.replace(/\s+/g, '-')}"></div>
            <div class="time-24h" id="time-24h-${country.name.replace(/\s+/g, '-')}"></div>
        </div>
        <div class="date" id="date-${country.name.replace(/\s+/g, '-')}"></div>
    `;
    return card;
}

// Função para atualizar o relógio
function updateClock(country) {
    const time12hElement = document.getElementById(`time-12h-${country.name.replace(/\s+/g, '-')}`);
    const time24hElement = document.getElementById(`time-24h-${country.name.replace(/\s+/g, '-')}`);
    const dateElement = document.getElementById(`date-${country.name.replace(/\s+/g, '-')}`);
    
    const now = new Date();
    const options = { timeZone: country.timezone };
    
    const time12h = now.toLocaleTimeString('en-US', {
        ...options,
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const time24h = now.toLocaleTimeString('en-US', {
        ...options,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const date = now.toLocaleDateString('en-US', {
        ...options,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    time12hElement.textContent = time12h;
    time24hElement.textContent = time24h;
    dateElement.textContent = date;
}

// Inicializar os relógios
function initializeClocks() {
    countries.forEach(country => {
        const card = createClockCard(country);
        clocksGrid.appendChild(card);
        updateClock(country);
    });
}

// Atualizar todos os relógios a cada segundo
function updateAllClocks() {
    countries.forEach(updateClock);
}

// Função de pesquisa
function filterClocks(searchTerm) {
    const cards = document.querySelectorAll('.clock-card');
    searchTerm = searchTerm.toLowerCase();
    
    cards.forEach(card => {
        const countryName = card.querySelector('.country-name').textContent.toLowerCase();
        if (countryName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    filterClocks(e.target.value);
});

// Inicialização
initializeClocks();
setInterval(updateAllClocks, 1000); 