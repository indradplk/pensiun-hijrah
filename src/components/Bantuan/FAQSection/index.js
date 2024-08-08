import React, { useState } from 'react';
import {
  FAQContainer,
  FAQWrapper,
  SearchBar,
  SearchInput
} from './FAQElements';
import Faq from 'react-faq-component';
import { umum, pendiri, peserta, hakwajib, iuran, manfaat, anuitas, bayar, style } from './Data';

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterData = (data) => {
    if (!searchQuery) return data;
    return {
      ...data,
      rows: data.rows.filter(
        row => row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               row.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };
  };

  return (
    <FAQContainer id="faq">
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Cari pertanyaan..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <FAQWrapper>
        <Faq data={filterData(umum)} styles={style}/>
        <Faq data={filterData(pendiri)} styles={style}/>
        <Faq data={filterData(peserta)} styles={style}/>
        <Faq data={filterData(hakwajib)} styles={style}/>
        <Faq data={filterData(iuran)} styles={style}/>
        <Faq data={filterData(manfaat)} styles={style}/>
        <Faq data={filterData(anuitas)} styles={style}/>
        <Faq data={filterData(bayar)} styles={style}/>
      </FAQWrapper>
    </FAQContainer>
  );
};

export default FAQSection;