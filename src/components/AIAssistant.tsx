
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Card,
  CardContent,
  IconButton,
  useTheme as useMuiTheme
} from '@mui/material';
import { Send, SmartToy, Person, LightbulbOutlined } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

// Message type
interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const { t } = useLanguage();
  const muiTheme = useMuiTheme();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  // Sample initial message from AI
  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: 'Hej! Jag är din AI-assistent. Hur kan jag hjälpa dig idag? Du kan fråga mig om asbestsanering, rengöringstekniker eller vilket städmaterial som passar bäst för olika situationer.',
        timestamp: new Date()
      }
    ]);
  }, []);
  
  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle sending message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      // Add AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: getMockResponse(userMessage.text),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  // Handle keypress (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Mock responses based on input
  const getMockResponse = (input: string): string => {
    const inputLower = input.toLowerCase();
    
    if (inputLower.includes('asbest') || inputLower.includes('asbestos')) {
      return 'Vid asbestsanering är säkerheten viktigast. Använd alltid korrekt skyddsutrustning: andningsskydd med P3-filter, heltäckande engångsoverall, handskar och skoskydd. Arbetsområdet måste förslutas ordentligt och undertryck skapas. Allt material måste fuktas före hantering för att minimera dammspridning. Asbestavfall ska paketeras i godkända, märkta behållare och transporteras till särskild avfallsanläggning. Kom ihåg att asbestsanering kräver särskild behörighet och tillstånd från Arbetsmiljöverket.';
    }
    
    if (inputLower.includes('graffiti') || inputLower.includes('klotter')) {
      return 'För effektiv klottersanering, identifiera först ytans material (betong, tegel, metall, etc.) och vilken typ av färg som använts. För porösa ytor som tegel och betong, använd alkaliska borttagningsmedel eller specialiserade gelbaserade produkter. På släta, icke-porösa ytor fungerar ofta lösningsmedelsbaserade produkter bäst. Vid användning av högtryckstvätt, justera alltid trycket efter underlaget för att undvika skador. Miljövänliga alternativ finns också tillgängliga, särskilt för känsliga miljöer eller historiska byggnader. Kom ihåg att använda korrekt skyddsutrustning: handskar, skyddsglasögon och ibland andningsskydd.';
    }
    
    if (inputLower.includes('byggstädning') || inputLower.includes('building')) {
      return 'Byggstädning bör genomföras i etapper, med grovstädning först för att avlägsna större skräp och byggdamm, följt av en finstädning. Använd industridammsugare med HEPA-filter för effektiv dammhantering. För golvytor, tillämpa lämpliga rengöringsmetoder baserat på materialet – olika metoder krävs för betong, keramik, trä eller linoleum. Torka av alla ytor inklusive fönsterkarmar, eluttag och belysningsarmaturer. För svåråtkomliga platser som ventilationskanaler, använd specialverktyg eller ta hjälp av fackmän. Avsluta med en kvalitetskontroll genom att inspektera alla utrymmen i bra belysning.';
    }
    
    // Default response if no keywords match
    return 'Tack för din fråga. För att ge dig det bästa svaret skulle jag behöva mer specifik information om vilken typ av rengöring du är intresserad av. Vänligen specificera om det gäller asbestsanering, byggstädning, klottersanering eller annan typ av städtjänst, så kan jag ge dig mer detaljerad information.';
  };
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom fontWeight="medium">
          {t('aiAssistant')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('aiHelp')}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          <Card sx={{ flex: 1, minWidth: 200 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LightbulbOutlined color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{t('aiTip1')}</Typography>
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, minWidth: 200 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LightbulbOutlined color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{t('aiTip2')}</Typography>
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1, minWidth: 200 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LightbulbOutlined color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{t('aiTip3')}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Paper>
      
      <Paper 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          height: 'calc(100vh - 300px)',
          maxHeight: 700,
          minHeight: 400
        }}
      >
        {/* Messages container */}
        <Box 
          sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            p: 2,
            backgroundColor: muiTheme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)'
          }}
        >
          <List>
            {messages.map((message) => (
              <ListItem 
                key={message.id} 
                sx={{ 
                  flexDirection: 'column', 
                  alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    mb: 0.5
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: message.sender === 'ai' ? 'primary.main' : 'secondary.main',
                      mr: message.sender === 'user' ? 0 : 1,
                      ml: message.sender === 'user' ? 1 : 0
                    }}
                  >
                    {message.sender === 'ai' ? <SmartToy /> : <Person />}
                  </Avatar>
                  
                  <Paper 
                    sx={{ 
                      p: 2, 
                      maxWidth: '80%',
                      borderRadius: 2,
                      backgroundColor: message.sender === 'ai' 
                        ? (muiTheme.palette.mode === 'dark' ? 'background.paper' : 'background.default')
                        : 'primary.main',
                      color: message.sender === 'user' ? 'white' : 'text.primary'
                    }}
                  >
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {message.text}
                    </Typography>
                  </Paper>
                </Box>
                
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    pl: message.sender === 'ai' ? 5 : 0,
                    pr: message.sender === 'user' ? 5 : 0
                  }}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </ListItem>
            ))}
            
            {loading && (
              <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                    <SmartToy />
                  </Avatar>
                  <Paper 
                    sx={{ 
                      p: 2, 
                      borderRadius: 2,
                      backgroundColor: muiTheme.palette.mode === 'dark' ? 'background.paper' : 'background.default'
                    }}
                  >
                    <CircularProgress size={20} />
                  </Paper>
                </Box>
              </ListItem>
            )}
            
            <div ref={messagesEndRef} />
          </List>
        </Box>
        
        <Divider />
        
        {/* Input area */}
        <Box sx={{ p: 2, display: 'flex', backgroundColor: 'background.paper' }}>
          <TextField
            fullWidth
            placeholder={t('askQuestion')}
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            sx={{ mr: 2 }}
            disabled={loading}
          />
          <Button 
            variant="contained" 
            endIcon={<Send />}
            onClick={handleSendMessage}
            disabled={!input.trim() || loading}
          >
            {t('send')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AIAssistant;
