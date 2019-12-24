import React, { Fragment } from 'react'
import Header from '../components/header';
import { Paper, TextareaAutosize, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { flexbox } from '@material-ui/system';
import { getEvents } from '../utils/dataAccess';
import SaveIcon from '@material-ui/icons/Save';

const data = [
  {
    title: "catering",
    description: "Evo liste rucka: https://docs.google.com/spreadsheets/d/1SPu_mZuIG--9kBX1TbF3wVGkCVTJVJP-SRsnqV0-15Q/edit?ts=59fb4615#gid=485802603"
  },
  {
    title: "coumiti card",
    description: "V Community Card je benefit kartica koju dobija svaki zaposleni IV-a. Pogledaj popuste ispod i koristi ih u sreci i zdravlju! \n🗝️MUZEJ ILUZIJA: https://www.muzejiluzija.rs/\nPopust od 10% \n👨‍🎤POZORISTE NA TERAZIJAMA: https://www,pozoristeterazije.com/\nPopust od 30% na kompletan repertoar.\n 💻SISTEM:I: http://sistemi.rs/\nPopust do 10%\nCOMPUTERLAND AND FUTURE BY COMPUTERLAND: https://www.computerlandshop.rs/\nPopust do 10%\n🖥️GIGATRON: https://www.gigatron.rs\nPopust do 15%\n👀BELLOKO:  http://www.belloko.rs/sr/o-nama\nPopust 20% na sve usluge.\n💆‍♂️ HILTON TERETANA I SPA CENTAR\nPosebni uslovi za clanove\n🏋️‍♂️FASTFIT ZIRA: http://www.fastfit.rs/fitness/\nPopust do 30%\n🥊 WARRIOR FACTORY: http://warriorfactory.rs/\nPopust do 20%\n➕UNIQA OSIGURANJE: www.uniqa.rs\nPopust do 8%\nVise detalja mozes da nadjes na Trello Board-u> https://trello.com/b/Tw36bLtg/iv-community-club-card-benefits"
  },
  {
    title: "events",
    description: "Predstojeci IV dogadjaji:\nHackathon - 24.12.2019.\nIV Ney Year's party - 27.12.2019."
  },
  
  {
    title: "instagram",
    description: "InterVenture instagram profil se nalazi na linku: https://www.instagram.com/interventure.info/ 🤳🏻"
  },
  {
    title: "facebook",
    description: "InterVenture facebook profil se nalazi na linku: https://www.facebook.com/InterVenture/"
  },
  {
    title: "linkedin",
    description: "InterVenture linkedin profil se nalazi na linku: https://www.linkedin.com/company/interventure-gmbh/ "
  },
  {
    title: "personio",
    description: "Personio link: https://interventure.personio.de/"
  },
  {
    title: "preporuke",
    description: "Referral permanent positions: https://trello.com/c/MxIDIXgQ/18-referral-for-permanent-positions\nReferral freelance positions: https://trello.com/c/khp5U7Lq/19-referral-for-freelance-positions\nReferral for new partnerships: https://trello.com/c/0GsHi5C4/20-referral-for-new-partnerships"
  },
  {
    title: "plata",
    description: "Plata stize do 10. u mesecu."
  },
  {
    title: "dani odmora",
    description: "Lista neradnih dana za 2020. godinu :calendar:\n• 1. i 2. januar - *Nova godina*\n• 7. januar - *Božić*\n• 15, 16. i 17. februar - *Dan državnosti*\n• 1. i 2. maj - *Praznik rada*\n• 11. novembar - *Dan primirja u Prvom svetskom ratu*"
  },
]

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '10px'
  },
  title: {
    marginBottom: 0,
    padding: '10px'
  },
  edit: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px'
  },
  text: {
    width: '50%'
  }
}));

const Ops = (props) => {
  console.log(props)
  const classes = useStyles();

  return(
    <Fragment>
      <Header/>
      {data.map(obj => {
        return (
          <Paper className={classes.wrapper}>
          <h2 className={classes.title}>{obj.title}</h2>
          <div className={classes.edit}>
            <TextareaAutosize className={classes.text} aria-label="minimum height" rowsMin={3} value={obj.description} />      
            <Button
              color="secondary"
              variant="contained"
              className={classes.itemAction}
              onClick={() => handleAcceptArticle(article._id)}
            >
              Sačuvaj
              <SaveIcon />
            </Button>
          
          </div>
        </Paper>
        )
      })}
        
         
        
    </Fragment>
  )
  }

  Ops.getInitialProps = async ({ req }) => {
    const events = await getEvents();
    return {
      events
    };
  };

export default Ops
