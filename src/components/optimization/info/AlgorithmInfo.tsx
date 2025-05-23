import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import PeopleIcon from '@mui/icons-material/People';
import FlightIcon from '@mui/icons-material/Flight';

const AlgorithmInfo: React.FC = () => {
    return (
        <Box className="optimization-section">
            <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 3, color: '#512da8', textAlign: 'center' }}>
                Algoritmi de Optimizare a Consumului Energetic
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 4, textAlign: 'justify', lineHeight: 1.7 }}>
                Pentru a optimiza consumul energetic al clădirilor, am implementat trei algoritmi de inteligență artificială
                care sunt inspirați din natură. Fiecare algoritm are abordări diferite și oferă performanțe diferite în funcție
                de contextul specific. Acești algoritmi analizează datele de consum și propun strategii de optimizare care pot
                duce la economii semnificative de energie, fără a compromite confortul ocupanților.
            </Typography>

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 4,
                marginBottom: 5
            }}>
                <Box sx={{ flex: '1 1 calc(33.333% - 32px)', minWidth: '280px' }}>
                    <Paper elevation={3} className="algorithm-card aco-card">
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <BugReportIcon sx={{ fontSize: '2rem', color: '#673ab7', marginRight: 1 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Ant Colony Optimization (ACO)
                            </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'justify', lineHeight: 1.6 }}>
                            Algoritmul de Optimizare prin Colonie de Furnici este inspirat din comportamentul furnicilor care
                            găsesc cele mai scurte rute între sursele de hrană și colonie.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#512da8', marginTop: 2 }}>
                            Cum funcționează:
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            1. <strong>Definirea spațiului de căutare:</strong> Transformă problema de optimizare a consumului energetic într-un graf.
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            2. <strong>Inițializarea feromonilor:</strong> Fiecărei potențiale soluții i se atribuie o cantitate inițială de feromoni.
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            3. <strong>Construirea soluțiilor:</strong> "Furnicile" virtuale construiesc soluții bazate pe cantitatea de feromoni și pe o euristica specifică.
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            4. <strong>Actualizarea feromonilor:</strong> După fiecare iterație, traseele bune primesc mai mulți feromoni, iar cele slabe pierd feromoni prin evaporare.
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            5. <strong>Convergența:</strong> După mai multe iterații, algoritmul converge către o soluție aproape optimă.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#512da8', marginTop: 2 }}>
                            Avantaje:
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Foarte eficient pentru probleme complexe de optimizare cu multe variabile
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Capacitatea excelentă de a evita minimele locale
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Adaptabilitate bună la schimbările de mediu
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#512da8', marginTop: 2 }}>
                            Dezavantaje:
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Convergență mai lentă în unele cazuri
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Sensibilitate la setarea parametrilor
                        </Typography>
                    </Paper>
                </Box>

                <Box sx={{ flex: '1 1 calc(33.333% - 32px)', minWidth: '280px' }}>
                    <Paper elevation={3} className="algorithm-card ga-card">
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <PeopleIcon sx={{ fontSize: '2rem', color: '#4caf50', marginRight: 1 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Genetic Algorithm (GA)
                            </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'justify', lineHeight: 1.6 }}>
                            Algoritmul Genetic este inspirat din teoria evoluției și din procesele de selecție naturală, recombinare
                            genetică și mutație.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2e7d32', marginTop: 2 }}>
                            Cum funcționează:
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            1. <strong>Inițializarea populației:</strong> Se creează o populație inițială de soluții potențiale (indivizi).
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            2. <strong>Evaluarea fitness-ului:</strong> Fiecare individ este evaluat pentru a determina cât de bine rezolvă problema.
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            3. <strong>Selecția:</strong> Indivizii cu fitness mai bun au o probabilitate mai mare de a fi selectați pentru reproducere.
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            4. <strong>Recombinarea (crossover):</strong> Indivizii selectați sunt combinați pentru a crea descendenți care moștenesc caracteristici de la ambii părinți.
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            5. <strong>Mutația:</strong> Se introduc mici schimbări aleatorii în unii descendenți pentru a menține diversitatea genetică.
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            6. <strong>Evoluția:</strong> Noua generație înlocuiește (parțial sau total) generația anterioară, și procesul se repetă.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2e7d32', marginTop: 2 }}>
                            Avantaje:
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Capacitate bună de a explora spații de căutare mari
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Capacitate bună de a combina soluții parțiale bune
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Robustețe ridicată față de zgomot și incertitudine
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2e7d32', marginTop: 2 }}>
                            Dezavantaje:
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Poate suferi de convergență prematură
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Necesită ajustarea atentă a operatorilor genetici și a parametrilor
                        </Typography>
                    </Paper>
                </Box>

                <Box sx={{ flex: '1 1 calc(33.333% - 32px)', minWidth: '280px' }}>
                    <Paper elevation={3} className="algorithm-card pso-card">
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <FlightIcon sx={{ fontSize: '2rem', color: '#f74a8a', marginRight: 1 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Particle Swarm Optimization (PSO)
                            </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'justify', lineHeight: 1.6 }}>
                            Algoritmul de Optimizare prin Roiuri de Particule este inspirat din comportamentul social al păsărilor și peștilor
                            care se mișcă în formații pentru a găsi resurse.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f74a8a', marginTop: 2 }}>
                            Cum funcționează:
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            1. <strong>Inițializarea particulelor:</strong> Se creează un set de particule (soluții potențiale) distribuite aleatoriu în spațiul de căutare.
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            2. <strong>Evaluarea fitness-ului:</strong> Se evaluează fitness-ul fiecărei particule.
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            3. <strong>Actualizarea poziției și vitezei:</strong> Fiecare particulă își actualizează poziția și viteza bazându-se pe:
                            <br />&nbsp;&nbsp;&nbsp;• Cea mai bună poziție personală (pbest)
                            <br />&nbsp;&nbsp;• Cea mai bună poziție globală (gbest) sau cea mai bună poziție din vecinătate
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            4. <strong>Convergența:</strong> Particulele tind să se miște treptat către cele mai bune regiuni din spațiul de căutare.
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f74a8a', marginTop: 2 }}>
                            Avantaje:
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Convergență rapidă către soluții optime
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Implementare relativ simplă
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Necesită puțini parametri de ajustat
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Eficiență computațională bună
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f74a8a', marginTop: 2 }}>
                            Dezavantaje:
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Poate rămâne blocată în minime locale
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                            • Performanța poate scădea în probleme foarte complexe
                        </Typography>
                    </Paper>
                </Box>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 2, color: '#512da8' }}>
                Comparație între algoritmi
            </Typography>

            <Box sx={{ overflowX: 'auto', marginBottom: 4 }}>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Criterii</th>
                            <th>Ant Colony Optimization (ACO)</th>
                            <th>Genetic Algorithm (GA)</th>
                            <th>Particle Swarm Optimization (PSO)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Inspirație</strong></td>
                            <td>Comportamentul furnicilor</td>
                            <td>Selecția naturală și genetica</td>
                            <td>Comportamentul păsărilor/peștilor în stoluri</td>
                        </tr>
                        <tr>
                            <td><strong>Memorie</strong></td>
                            <td>Colectivă (feromoni)</td>
                            <td>Generațională</td>
                            <td>Individuală și colectivă</td>
                        </tr>
                        <tr>
                            <td><strong>Viteză de convergență</strong></td>
                            <td>Medie</td>
                            <td>Lentă-Medie</td>
                            <td>Rapidă</td>
                        </tr>
                        <tr>
                            <td><strong>Paralelizare</strong></td>
                            <td>Bună</td>
                            <td>Foarte bună</td>
                            <td>Foarte bună</td>
                        </tr>
                        <tr>
                            <td><strong>Complexitate implementare</strong></td>
                            <td>Moderată</td>
                            <td>Moderată</td>
                            <td>Simplă</td>
                        </tr>
                        <tr>
                            <td><strong>Adaptabilitate</strong></td>
                            <td>Foarte bună</td>
                            <td>Bună</td>
                            <td>Medie</td>
                        </tr>
                        <tr>
                            <td><strong>Sensibilitate la parametri</strong></td>
                            <td>Ridicată</td>
                            <td>Medie</td>
                            <td>Scăzută</td>
                        </tr>
                        <tr>
                            <td><strong>Explorarea spațiului de căutare</strong></td>
                            <td>Foarte bună</td>
                            <td>Bună</td>
                            <td>Medie</td>
                        </tr>
                        <tr>
                            <td><strong>Exploatarea soluțiilor promițătoare</strong></td>
                            <td>Bună</td>
                            <td>Medie</td>
                            <td>Foarte bună</td>
                        </tr>
                        <tr>
                            <td><strong>Performanță în optimizare energetică</strong></td>
                            <td>Excelentă pentru probleme complexe</td>
                            <td>Bună pentru probleme cu multe variabile</td>
                            <td>Excelentă pentru convergență rapidă</td>
                        </tr>
                    </tbody>
                </table>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 2, color: '#512da8' }}>
                Aplicație în optimizarea consumului energetic
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 3, textAlign: 'justify', lineHeight: 1.7 }}>
                În context practic, acești algoritmi analizează tiparele de consum energetic și propun ajustări la
                funcționarea sistemelor din clădire (HVAC, iluminat, echipamente, etc.) pentru a minimiza consumul total,
                menținând în același timp nivelurile de confort. Acest echilibru este esențial, deoarece simpla reducere
                a consumului energetic fără considerarea confortului ocupanților nu reprezintă o soluție viabilă.
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 3, textAlign: 'justify', lineHeight: 1.7 }}>
                <strong>ACO</strong> este deosebit de eficient în scenarii complexe cu multe variabile interdependente,
                cum ar fi clădirile mari cu sisteme HVAC sofisticate. Capacitatea sa de a evita minimele locale îl face
                ideal pentru optimizări pe termen lung.
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 3, textAlign: 'justify', lineHeight: 1.7 }}>
                <strong>GA</strong> excelează în probleme cu multe soluții potențiale și parametri, fiind capabil să descopere
                combinații neobișnuite dar eficiente de ajustări. Este robust în fața incertitudinii și zgomotului din date,
                ceea ce îl face potrivit pentru medii reale.
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 3, textAlign: 'justify', lineHeight: 1.7 }}>
                <strong>PSO</strong> oferă soluții rapide și eficiente, fiind ideal pentru optimizări în timp real sau situații
                care necesită ajustări frecvente. Simplitatea sa de implementare îl face potrivit pentru sisteme cu resurse
                computaționale limitate.
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 3, textAlign: 'justify', lineHeight: 1.7 }}>
                În practică, combinația acestor algoritmi poate oferi cele mai bune rezultate, utilizând avantajele fiecăruia
                în funcție de contextul specific. Datele din graficele prezentate demonstrează potențialul semnificativ de economisire
                a energiei prin aplicarea acestor tehnici avansate de optimizare.
            </Typography>
        </Box>
    );
};

export default AlgorithmInfo; 