import React, { useEffect, useState } from 'react';
import {
  TimelineContainer,
  TimelineWrapper,
  TimelineRow,
  Heading,
} from './TimelineElements';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../../../style.css';

const TimelineSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <TimelineContainer>
        <TimelineWrapper>
          <Heading>Perjalanan Pensiun Hijrah</Heading>
          <TimelineRow>
            <VerticalTimeline
              lineColor= '#61298A'
              layout='1-column-left'
            >
              <VerticalTimelineElement
                className='vertical-timeline-element--work'
                contentStyle={{ background: 'linear-gradient(108deg, #61298A 0%, #D7A1FF 100%)', color: '#fff', borderRadius: '15px', width: windowWidth <= 480 ? '200px' : '500px', padding: '20px 40px' }}
                contentArrowStyle={{ borderRight: '10px solid #61298A' }}
                iconStyle={{ background: 'linear-gradient(157.81deg, #F6FFEE -43.27%, #ECFFDB -21.24%, #DBFCBD 12.19%, #BEF48D 29.82%, #A3E169 51.94%, #80C342 90.29%' }}
              >
                <h3 className="vertical-timeline-element-title"><b>2017</b></h3>
                <p>
                  DPLK Muamalat telah memenuhi persyaratan penyelenggaraan program pensiun berdasarkan prinsip Syariah dan telah berubah nama menjadi DPLK Syariah Muamalat.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className='vertical-timeline-element--work'
                contentStyle={{ background: 'linear-gradient(108deg, #61298A 0%, #D7A1FF 100%)', color: '#fff', borderRadius: '15px', width: windowWidth <= 480 ? '200px' : '500px', padding: '20px 40px' }}
                contentArrowStyle={{ borderRight: '10px solid #61298A' }}
                iconStyle={{ background: 'linear-gradient(157.81deg, #F6FFEE -43.27%, #ECFFDB -21.24%, #DBFCBD 12.19%, #BEF48D 29.82%, #A3E169 51.94%, #80C342 90.29%' }}
              >
                <h3 className="vertical-timeline-element-title"><b>1997</b></h3>
                <p>
                  Didirikannya DPLK Muamalat pada tanggal 12 September 1997 dengan Surat Keputusan Menteri Keuangan No.KEP-485/KM.17/1997.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className='vertical-timeline-element--work'
                contentStyle={{ background: 'linear-gradient(108deg, #61298A 0%, #D7A1FF 100%)', color: '#fff', borderRadius: '15px', width: windowWidth <= 480 ? '200px' : '500px', padding: '20px 40px' }}
                contentArrowStyle={{ borderRight: '10px solid #61298A' }}
                iconStyle={{ background: 'linear-gradient(157.81deg, #F6FFEE -43.27%, #ECFFDB -21.24%, #DBFCBD 12.19%, #BEF48D 29.82%, #A3E169 51.94%, #80C342 90.29%' }}
              >
                <h3 className="vertical-timeline-element-title"><b>1992</b></h3>
                <p>
                  PT Bank Muamalat Indonesia Tbk mulai beroperasi pada 1 Mei 1992 dan tanggal tersebut juga ditetapkan sebagai hari lahir Bank Muamalat Indonesia.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className='vertical-timeline-element--work'
                contentStyle={{ background: 'linear-gradient(108deg, #61298A 0%, #D7A1FF 100%)', color: '#fff', borderRadius: '15px', width: windowWidth <= 480 ? '200px' : '500px', padding: '20px 40px' }}
                contentArrowStyle={{ borderRight: '10px solid #61298A' }}
                iconStyle={{ background: 'linear-gradient(157.81deg, #F6FFEE -43.27%, #ECFFDB -21.24%, #DBFCBD 12.19%, #BEF48D 29.82%, #A3E169 51.94%, #80C342 90.29%' }}
              >
                <h3 className="vertical-timeline-element-title"><b>1991</b></h3>
                <p>
                  PT Bank Muamalat Indonesia Tbk berdiri, merupakan bank pertama di Indonesia yang menggunakan konsep perbankan secara Syariah.
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
            </TimelineRow>
        </TimelineWrapper>
      </TimelineContainer>
    </>
  );
};

export default TimelineSection;
