import { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select, Space, Table, message } from 'antd';
import { organisers } from '../jsonlist/organiser';
import { phcLocations } from '../jsonlist/phcLocations';
const { TextArea } = Input;
function PublicHealthCareCenters() {
    const [assignedList, setAssignedList] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalText, setModalText] = useState("")

    useEffect(() => {
        let result = {}
        phcLocations.map(({ value }) => {
            result[value] = []
        })
        setAssignedList(result);
    }, [])

    const handleChange = (data, key) => {
        let result = { ...assignedList };
        result[key] = data;
        let text = Object.keys(result).map(listKey => {
            let locationLabel = phcLocations.find(loc => `${loc.value}` === `${listKey}`).label;
            let locationOrganisers = []
            organisers.map(org => {
                if (result[listKey].includes(org.value)) {
                    locationOrganisers.push(org.label)
                }
            })
            return `${locationLabel} - ${locationOrganisers.join(', ')}`
        })
        setModalText(text.join('\n'));
        setAssignedList(result)
    }

    const handleGenerate = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        navigator.clipboard.writeText(modalText);
        message.success('Message copied!');
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onChange = (text) => {
        setModalText(text.target.value)
    }

    return (
        <>
            <Form layout="vertical" style={{ padding: '10px' }}>
                {phcLocations.map(location => {
                    return <Form.Item label={location.label} key={location.value}>
                        <Select
                            key={location.key}
                            mode="multiple"
                            allowClear
                            placeholder="Please select"
                            defaultValue={assignedList[location.value]}
                            onChange={(data) => {
                                handleChange(data, location.value)
                            }}
                            options={organisers}
                        />
                    </Form.Item>
                })}
                <Button type="primary" block onClick={handleGenerate} style={{ marginBottom: 10 }}>
                    Generate Text
                </Button>
            </Form>
            <Modal
                title="Orgainsers Assigned Locations"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Copy Text
                    </Button>
                ]}
            >
                <TextArea value={modalText} onChange={onChange} rows={10} />
            </Modal>
        </>
    );
}

export default PublicHealthCareCenters;
