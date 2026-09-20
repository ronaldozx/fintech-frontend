import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DefaultButtonStyle } from "../../components/button/style";
import { NavBar } from "../../components/navBar";
import { Sidebar } from "../../components/sidebar";
import Modal from "../../components/modal";
import { CancelButton, Content, FileInput, FileLabel, FileName, FormRow, Header, ErrorText, FileButton, ContentModules } from "./style";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, type ChangeEvent, useRef } from "react";
import { importOfx } from "../../services/transaction";
import { CashFlow } from "../../modules/CashFlow/component/grid";
import { TransactionIntelligence } from "../../modules/TransactionIntelligence/component/grid/index";


export function Home() {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] ?? null;
        setAttachedFile(f);
    }

    function handleSave() {
        if (!attachedFile) return;
        setIsUploading(true);
        setErrorMsg(null);
        (async () => {
            try {
                await importOfx(attachedFile);
                setOpenModalCreate(false);
                setAttachedFile(null);
            } catch (err) {
                setErrorMsg(err instanceof Error ? err.message : "Erro ao importar extrato");
            } finally {
                setIsUploading(false);
            }
        })();
    }


    return (
        <>
            <NavBar/>
            <Sidebar/>
            <Content>
                <Header>
                    <DefaultButtonStyle
                        onClick={() => setOpenModalCreate(true)}
                    >
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </DefaultButtonStyle> 
                    <DefaultButtonStyle><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon></DefaultButtonStyle> 
                </Header>
                <ContentModules>
                    <CashFlow/>
                    <TransactionIntelligence/>
                </ContentModules>

                <Modal
                    isOpen={openModalCreate}
                    onClose={() => { setOpenModalCreate(false); setAttachedFile(null); }}
                    title="Create New Item"
                    footer={
                        <>
                            <CancelButton onClick={() => { setOpenModalCreate(false); setAttachedFile(null); }}>Cancel</CancelButton>
                            <DefaultButtonStyle onClick={handleSave} disabled={!attachedFile || isUploading}>
                                Salvar
                            </DefaultButtonStyle>
                        </>
                    }
                >
                    <FormRow>
                        <FileLabel>Anexar arquivo</FileLabel>
                        <FileInput ref={fileInputRef} type="file" onChange={handleFileChange} />
                        <FileButton type="button" onClick={() => fileInputRef.current?.click()}>Escolher arquivo</FileButton>
                        {attachedFile && <FileName>{attachedFile.name}</FileName>}
                        {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
                    </FormRow>
                </Modal>
            </Content>

        </>
    )
}
