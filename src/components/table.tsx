'use client';

import React, { useState, useCallback } from 'react';
import { Gs } from '../lib/supabase';
import ProjectDetails from './ProjectDetails';
import TableComponent from './table/TableComponent';
import '../styles/module.css';

function GsTable({ gs }: { gs: Gs[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Gs | null>(null);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleOpen = useCallback((item: Gs) => {
    setSelectedItem(item);
    setTitle(`${item.id} - ${item.proj_name}`);
    setContent(`其他项目细节，例如：${item.fund_source}`);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <TableComponent gs={gs} handleOpen={handleOpen} />
      {isOpen && <ProjectDetails item={selectedItem} title={title} content={content} onClose={handleClose} />}
    </>
  );
}

export default React.memo(GsTable);
